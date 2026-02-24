"use client";

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface CitedTopicsChartProps {
  className?: string;
}

interface TopicDataPoint {
  date: string;
  value: number;
}

interface TopicSeries {
  name: string;
  color: string;
  data: TopicDataPoint[];
}

// Mock data for cited topics over time
const topicsData: TopicSeries[] = [
  {
    name: 'Best no-code builders',
    color: '#9333ea', // Purple
    data: [
      { date: '3/1', value: 28 },
      { date: '3/2', value: 32 },
      { date: '3/3', value: 30 },
      { date: '3/4', value: 35 },
      { date: '3/5', value: 33 },
      { date: '3/6', value: 38 },
      { date: '3/7', value: 36 },
    ],
  },
  {
    name: 'Portfolio website',
    color: '#22d3ee', // Cyan
    data: [
      { date: '3/1', value: 18 },
      { date: '3/2', value: 22 },
      { date: '3/3', value: 20 },
      { date: '3/4', value: 24 },
      { date: '3/5', value: 26 },
      { date: '3/6', value: 23 },
      { date: '3/7', value: 25 },
    ],
  },
  {
    name: 'Drag and drop editors',
    color: '#da6d95', // Pink
    data: [
      { date: '3/1', value: 12 },
      { date: '3/2', value: 15 },
      { date: '3/3', value: 14 },
      { date: '3/4', value: 18 },
      { date: '3/5', value: 16 },
      { date: '3/6', value: 19 },
      { date: '3/7', value: 17 },
    ],
  },
  {
    name: 'Other',
    color: '#6b7280', // Gray
    data: [
      { date: '3/1', value: 8 },
      { date: '3/2', value: 10 },
      { date: '3/3', value: 9 },
      { date: '3/4', value: 11 },
      { date: '3/5', value: 12 },
      { date: '3/6', value: 10 },
      { date: '3/7', value: 11 },
    ],
  },
];

function MultiLineChart({ data, height = 160 }: { data: TopicSeries[]; height?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    const containerWidth = containerRef.current.clientWidth || 400;
    const containerHeight = height;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', containerHeight)
      .attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const margin = { top: 8, right: 32, bottom: 24, left: 8 };
    const chartWidth = containerWidth - margin.left - margin.right;
    const chartHeight = containerHeight - margin.top - margin.bottom;

    // Get all dates from first series
    const dates = data[0].data.map(d => d.date);

    // X scale
    const xScale = d3.scaleBand<string>()
      .domain(dates)
      .range([0, chartWidth])
      .paddingOuter(0)
      .paddingInner(0);

    // Y scale (0 to 50%)
    const yScale = d3.scaleLinear()
      .domain([0, 50])
      .range([chartHeight, 0]);

    // Y-axis ticks
    const yTicks = [50, 40, 30, 20, 10, 0];

    // Create chart group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw horizontal grid lines
    yTicks.forEach((tick) => {
      g.append('line')
        .attr('x1', 0)
        .attr('x2', chartWidth)
        .attr('y1', yScale(tick))
        .attr('y2', yScale(tick))
        .attr('stroke', 'rgba(255, 255, 255, 0.13)')
        .attr('stroke-width', 1);
    });

    // Line generator
    const line = d3.line<TopicDataPoint>()
      .x((d, i) => {
        const xPos = xScale(d.date);
        if (xPos === undefined) return 0;
        if (i === 0) return xPos;
        if (i === data[0].data.length - 1) return xPos + xScale.bandwidth();
        return xPos + xScale.bandwidth() / 2;
      })
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Draw lines for each topic
    data.forEach((series) => {
      g.append('path')
        .datum(series.data)
        .attr('fill', 'none')
        .attr('stroke', series.color)
        .attr('stroke-width', 2)
        .attr('d', line);
    });

    // Y-axis labels on the right (outside chart area)
    const yAxisGroup = svg.append('g')
      .attr('transform', `translate(${margin.left + chartWidth + 8},${margin.top})`);

    yTicks.forEach((tick) => {
      if (tick === 0) return; // Skip 0 label
      yAxisGroup.append('text')
        .attr('x', 0)
        .attr('y', yScale(tick))
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'middle')
        .attr('font-size', '11.5px')
        .style('fill', 'var(--text-secondary)')
        .text(`${tick}%`);
    });

    // X-axis labels
    const xAxisGroup = svg.append('g')
      .attr('transform', `translate(${margin.left},${containerHeight - margin.bottom + 8})`);

    dates.forEach((date) => {
      const xPos = xScale(date);
      const x = xPos !== undefined ? xPos + xScale.bandwidth() / 2 : 0;
      xAxisGroup.append('text')
        .attr('x', x)
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'hanging')
        .attr('font-size', '11.5px')
        .style('fill', 'var(--text-secondary)')
        .text(date);
    });

  }, [data, height]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}

export function CitedTopicsChart({ className = '' }: CitedTopicsChartProps) {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Chart */}
      <div className="flex-1 min-h-[170px]">
        <MultiLineChart data={topicsData} height={170} />
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-2">
        {topicsData.map((series) => (
          <div key={series.name} className="flex items-center gap-1.5">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: series.color }}
            />
            <span className="body-text text-[var(--text-secondary)]">{series.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
