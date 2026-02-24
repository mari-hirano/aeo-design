"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface SparklineProps {
  data?: number[];  // Array of numeric values
  className?: string;
  width?: number;
  height?: number;
  color?: 'green' | 'red'; // Color based on trend (green for up, red for down)
}

export function Sparkline({ 
  data = [], 
  className = '',
  width,
  height,
  color
}: SparklineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Determine color based on trend if not provided
  const lineColor = color || (data.length > 0 && data[data.length - 1] > data[0] ? 'green' : 'red');

  // Default dimensions
  const defaultWidth = width || 80;
  const defaultHeight = height || 24;

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) {
      return;
    }

    // Get container dimensions or use defaults
    const containerWidth = width || containerRef.current.clientWidth || defaultWidth;
    const containerHeight = height || containerRef.current.clientHeight || defaultHeight;

    setDimensions({ width: containerWidth, height: containerHeight });

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up SVG
    const svg = d3.select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", containerHeight);

    // Set up margins (minimal for sparkline)
    const margin = { top: 2, right: 2, bottom: 2, left: 2 };
    const chartWidth = containerWidth - margin.left - margin.right;
    const chartHeight = containerHeight - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, chartWidth]);

    // Use fixed domain for consistent scaling across all sparklines
    // This makes flat lines appear flatter and steep lines appear steeper
    // Fixed range covers all our data patterns (values range from ~8 to ~24)
    const fixedYMin = 0;
    const fixedYMax = 30;
    
    // Calculate data range to center it vertically
    const dataMin = Math.min(...data);
    const dataMax = Math.max(...data);
    const dataMid = (dataMin + dataMax) / 2;
    const fixedMid = (fixedYMin + fixedYMax) / 2;
    
    // Center the data vertically by adjusting the scale
    const yScale = d3.scaleLinear()
      .domain([fixedYMin, fixedYMax])
      .range([chartHeight, 0]);
    
    // Calculate offset to center the data
    const offset = fixedMid - dataMid;

    // Create line generator with vertical centering
    const line = d3.line<number>()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d + offset)) // Apply offset to center data vertically
      .curve(d3.curveMonotoneX); // Smooth curves that maintain monotonicity

    // Create group for chart
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Determine stroke color based on trend
    // Green for up trends, red for down trends
    const strokeColor = lineColor === 'green' 
      ? 'var(--text-green)' // Use theme green text color (for icons)
      : 'var(--text-red)';  // Use theme red text color

    // Draw line
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .style("stroke", strokeColor) // Use theme color based on trend
      .attr("stroke-width", 1.5)
      .attr("d", line);

  }, [data, width, height, defaultWidth, defaultHeight, lineColor]);

  if (data.length === 0) {
    return (
      <div ref={containerRef} className={`flex items-center justify-center ${className}`}>
        <div className="text-[var(--text-dimmed)] body-text text-[11.5px]">No data</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`} 
      style={{ 
        width: width || '100%', 
        height: '56px' // Fixed 56px container height
      }}
    >
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
