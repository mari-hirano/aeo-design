"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export interface TrafficAllocationDataPoint {
  date: string;
  [key: string]: string | number; // Dynamic keys for each variation
}

export interface TrafficAllocationSeries {
  name: string;
  color: string;
  key: string; // Key to access the value in data points
}

interface TrafficAllocationChartProps {
  data?: TrafficAllocationDataPoint[];
  series?: TrafficAllocationSeries[];
  className?: string;
  width?: number;
  height?: number;
  xAxisDates?: string[]; // Fixed dates for X-axis with even spacing
}

export function TrafficAllocationChart({
  data = [],
  series = [],
  className = '',
  width,
  height,
  xAxisDates,
}: TrafficAllocationChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const defaultWidth = width || 800;
  const defaultHeight = height || 279;

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0 || series.length === 0) {
      return;
    }

    const containerWidth = width || containerRef.current.clientWidth || defaultWidth;
    const containerHeight = height || containerRef.current.clientHeight || defaultHeight;

    setDimensions({ width: containerWidth, height: containerHeight });

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", containerHeight);

    const margin = { top: 9, right: 22, bottom: 48, left: 52 };
    const chartWidth = containerWidth - margin.left - margin.right;
    const chartHeight = containerHeight - margin.top - margin.bottom;

    // Use provided xAxisDates or get all unique dates from data
    const allDates = xAxisDates || data.map(d => d.date);

    const xScale = d3.scaleBand<string>()
      .domain(allDates)
      .range([0, chartWidth])
      .paddingOuter(0)
      .paddingInner(0);

    // Y-axis domain: 0 to 100
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([chartHeight, 0])
      .nice();

    // Y-axis ticks: 0, 20, 40, 60, 80, 100
    const yTicks = [100, 80, 60, 40, 20, 0];

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Prepare data for stacking
    const keys = series.map(s => s.key);
    
    // Create stack generator
    const stack = d3.stack<TrafficAllocationDataPoint>()
      .keys(keys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackedData = stack(data);

    // Create area generator
    const area = d3.area<d3.SeriesPoint<TrafficAllocationDataPoint>>()
      .x((d, i) => {
        const date = d.data.date;
        const xPos = xScale(date);
        if (xPos === undefined) return 0;
        // First point: use band start
        if (i === 0) return xPos;
        // Last point: use band end
        if (i === data.length - 1) return xPos + xScale.bandwidth();
        // Middle points: use band center
        return xPos + xScale.bandwidth() / 2;
      })
      .y0((d) => yScale(d[0])) // Bottom of stack
      .y1((d) => yScale(d[1])) // Top of stack
      .curve(d3.curveMonotoneX);

    // Draw stacked areas
    stackedData.forEach((seriesData, index) => {
      const seriesInfo = series[index];
      if (!seriesInfo) return;

      g.append("path")
        .datum(seriesData)
        .attr("fill", seriesInfo.color)
        .attr("opacity", 0.65)
        .attr("d", area);
    });

    // Draw Y-axis label (rotated)
    const yAxisLabelGroup = svg.append("g")
      .attr("transform", `translate(${margin.left - 30},${margin.top + chartHeight / 2})`);
    
    yAxisLabelGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("font-size", "11.5px")
      .attr("line-height", "16px")
      .style("fill", "var(--text-dimmed)")
      .text("Sessions (%)");

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

    // Tick mark heights based on Figma design pattern
    // Heights: 24px for most, 16px for some, 18px for others, 7px for one
    const tickHeights: { [key: number]: number } = {
      0: 24,   // 4/30
      1: 16,   // 5/3
      2: 24,   // 5/7
      3: 24,   // 5/15
      4: 18,   // 5/23
      5: 24,   // 6/1
      6: 24,   // 6/9
      7: 7,    // 6/25 (if exists, otherwise adjust)
      8: 24,   // 7/2
      9: 24,   // 7/10
      10: 24,  // 7/18
      11: 24,  // 7/26
      12: 24,  // 8/4
    };

    allDates.forEach((date, index) => {
      const xPos = xScale(date);
      const x = xPos !== undefined ? xPos + xScale.bandwidth() / 2 : 0;
      
      // Create group for date label and tick mark
      const tickGroup = xAxisGroup.append("g")
        .attr("transform", `translate(${x}, 0)`);

      // Date label
      tickGroup.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "hanging")
        .attr("font-size", "11.5px")
        .attr("line-height", "16px")
        .style("fill", "var(--text-dimmed)")
        .text(date);

      // Tick mark (varying heights based on position)
      const tickHeight = tickHeights[index] || 24;
      
      tickGroup.append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 16)
        .attr("y2", 16 + tickHeight)
        .attr("stroke", "var(--border-default)")
        .attr("stroke-width", 1);
    });

  }, [data, series, width, height, defaultWidth, defaultHeight, xAxisDates]);

  if (data.length === 0 || series.length === 0) {
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

