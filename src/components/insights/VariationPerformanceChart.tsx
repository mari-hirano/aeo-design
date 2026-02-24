"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export interface VariationDataPoint {
  date: string;
  value: number;
}

export interface VariationLine {
  name: string;
  data: VariationDataPoint[];
  color: string;
  isDashed?: boolean;
}

interface VariationPerformanceChartProps {
  lines?: VariationLine[];
  className?: string;
  width?: number;
  height?: number;
  yDomain?: [number, number];
  xAxisDates?: string[]; // Fixed dates for X-axis with even spacing
}

export function VariationPerformanceChart({
  lines = [],
  className = '',
  width,
  height,
  yDomain = [0, 10],
  xAxisDates,
}: VariationPerformanceChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const defaultWidth = width || 800;
  const defaultHeight = height || 250;

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || lines.length === 0) {
      return;
    }

    const containerWidth = width || containerRef.current.clientWidth || defaultWidth;
    const containerHeight = height || containerRef.current.clientHeight || defaultHeight;

    setDimensions({ width: containerWidth, height: containerHeight });

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", containerHeight);

    const margin = { top: 9, right: 22, bottom: 32, left: 22 };
    const chartWidth = containerWidth - margin.left - margin.right;
    const chartHeight = containerHeight - margin.top - margin.bottom;

    // Use provided xAxisDates or get all unique dates from lines
    const allDates = xAxisDates || Array.from(new Set(
      lines.flatMap(line => line.data.map(d => d.date))
    )).sort();

    const xScale = d3.scaleBand<string>()
      .domain(allDates)
      .range([0, chartWidth])
      .paddingOuter(0)
      .paddingInner(0);

    const [yMin, yMax] = yDomain;
    const yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([chartHeight, 0])
      .nice();

    // Y-axis ticks: 0, 2, 4, 6, 8, 10
    const yTicks = [10, 8, 6, 4, 2, 0];

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Draw horizontal grid lines
    yTicks.forEach((tick) => {
      g.append("line")
        .attr("x1", 0)
        .attr("x2", chartWidth)
        .attr("y1", yScale(tick))
        .attr("y2", yScale(tick))
        .attr("stroke", "var(--border-default)")
        .attr("stroke-width", 1)
        .attr("opacity", 1);
    });

    // Draw lines for each variation
    lines.forEach((line) => {
      const lineGenerator = d3.line<VariationDataPoint>()
        .x((d, i) => {
          const xPos = xScale(d.date);
          if (xPos === undefined) return 0;
          if (i === 0) return xPos;
          if (i === line.data.length - 1) return xPos + xScale.bandwidth();
          return xPos + xScale.bandwidth() / 2;
        })
        .y((d) => yScale(d.value))
        .curve(d3.curveLinear); // Use linear for straight segments

      const path = g.append("path")
        .datum(line.data)
        .attr("fill", "none")
        .style("stroke", line.color)
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", line.isDashed ? "4,2" : "none")
        .attr("d", lineGenerator);
    });

    // Draw Y-axis labels on the left
    const yAxisGroup = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    yTicks.forEach((tick) => {
      const y = yScale(tick);
      yAxisGroup.append("text")
        .attr("x", 0)
        .attr("y", y)
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "11.5px")
        .attr("line-height", "16px")
        .style("fill", "var(--text-dimmed)")
        .attr("dx", "-8px")
        .text(tick.toString());
    });

    // Draw X-axis labels on the bottom
    const xAxisGroup = svg.append("g")
      .attr("transform", `translate(${margin.left},${containerHeight - margin.bottom + 8})`);

    allDates.forEach((date) => {
      const xPos = xScale(date);
      const x = xPos !== undefined ? xPos + xScale.bandwidth() / 2 : 0;
      xAxisGroup.append("text")
        .attr("x", x)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "hanging")
        .attr("font-size", "11.5px")
        .attr("line-height", "16px")
        .style("fill", "var(--text-dimmed)")
        .text(date);
    });

  }, [lines, width, height, defaultWidth, defaultHeight, yDomain, xAxisDates]);

  if (lines.length === 0) {
    return (
      <div ref={containerRef} className={`flex items-center justify-center ${className}`}>
        <div className="text-[var(--text-dimmed)] body-text text-[11.5px]">No data</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ width: width || '100%', height: height || '100%' }}>
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}

