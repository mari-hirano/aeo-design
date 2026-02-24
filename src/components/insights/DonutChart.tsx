"use client";

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DonutChartData {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutChartData[];
  className?: string;
  size?: number;
  innerRadiusRatio?: number; // 0-1, how much of the radius is the inner hole
}

export function DonutChart({ 
  data, 
  className = '',
  size = 120,
  innerRadiusRatio = 0.6
}: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const radius = size / 2;
    const innerRadius = radius * innerRadiusRatio;

    // Set up SVG
    const svg = d3.select(svgRef.current)
      .attr("width", size)
      .attr("height", size)
      .append("g")
      .attr("transform", `translate(${radius}, ${radius})`);

    // Create pie generator
    const pie = d3.pie<DonutChartData>()
      .value(d => d.value)
      .sort(null);

    // Create arc generator
    const arc = d3.arc<d3.PieArcDatum<DonutChartData>>()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    // Create arcs
    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");

    // Draw paths
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => d.data.color);

  }, [data, size, innerRadiusRatio]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg ref={svgRef} />
    </div>
  );
}
