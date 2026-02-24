"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { InfoIcon, ChevronSmallDownIcon } from '@/icons';
import Tooltip from '@/components/spring-ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/spring-ui/dropdown-menu';
import * as d3 from 'd3';

interface TrafficDataPoint {
  date: string;
  value: number;
}

interface TrafficSeries {
  name: string;
  color: string;
  data: TrafficDataPoint[];
}

// Mock data for traffic sources over time
// LLM referred - lowest, bright purple
// Organic - higher, faded purple
// Direct - higher, faded purple
// Other - between LLM and Organic/Direct, gray
const trafficSourcesData: TrafficSeries[] = [
  {
    name: 'Organic',
    color: '#c084fc', // Faded purple
    data: [
      { date: '3/1', value: 42 },
      { date: '3/2', value: 45 },
      { date: '3/3', value: 43 },
      { date: '3/4', value: 48 },
      { date: '3/5', value: 46 },
      { date: '3/6', value: 50 },
      { date: '3/7', value: 47 },
    ],
  },
  {
    name: 'Direct',
    color: '#a78bfa', // Faded purple (slightly different shade)
    data: [
      { date: '3/1', value: 38 },
      { date: '3/2', value: 40 },
      { date: '3/3', value: 39 },
      { date: '3/4', value: 42 },
      { date: '3/5', value: 41 },
      { date: '3/6', value: 44 },
      { date: '3/7', value: 43 },
    ],
  },
  {
    name: 'Other',
    color: '#6b7280', // Gray
    data: [
      { date: '3/1', value: 18 },
      { date: '3/2', value: 20 },
      { date: '3/3', value: 19 },
      { date: '3/4', value: 22 },
      { date: '3/5', value: 21 },
      { date: '3/6', value: 24 },
      { date: '3/7', value: 23 },
    ],
  },
  {
    name: 'LLM referred',
    color: '#9333ea', // Bright purple
    data: [
      { date: '3/1', value: 5 },
      { date: '3/2', value: 7 },
      { date: '3/3', value: 6 },
      { date: '3/4', value: 9 },
      { date: '3/5', value: 8 },
      { date: '3/6', value: 11 },
      { date: '3/7', value: 10 },
    ],
  },
];

function TrafficSourcesChart({ data, height = 200 }: { data: TrafficSeries[]; height?: number }) {
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

    // Y scale (0 to 60%)
    const yScale = d3.scaleLinear()
      .domain([0, 60])
      .range([chartHeight, 0]);

    // Y-axis ticks
    const yTicks = [60, 50, 40, 30, 20, 10, 0];

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
    const line = d3.line<TrafficDataPoint>()
      .x((d, i) => {
        const xPos = xScale(d.date);
        if (xPos === undefined) return 0;
        if (i === 0) return xPos;
        if (i === data[0].data.length - 1) return xPos + xScale.bandwidth();
        return xPos + xScale.bandwidth() / 2;
      })
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Draw lines for each traffic source
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

// LLM influenced source options
type LLMInfluencedSource = 'Organic' | 'Direct' | 'Other';

const llmInfluencedOptions: LLMInfluencedSource[] = ['Organic', 'Direct', 'Other'];

// Main Component
interface TrafficSourcesSectionProps {
  className?: string;
}

export function TrafficSourcesSection({ className = '' }: TrafficSourcesSectionProps) {
  const { version } = useInsightsVersion();
  const [selectedSources, setSelectedSources] = useState<LLMInfluencedSource[]>(['Organic', 'Direct', 'Other']);

  const handleSourceToggle = (source: LLMInfluencedSource) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const getDropdownLabel = () => {
    if (selectedSources.length === 0) return 'None selected';
    if (selectedSources.length === llmInfluencedOptions.length) return 'All sources';
    return selectedSources.join(', ');
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center gap-1">
        <span className="body-text-bold text-[var(--text-secondary)]">Traffic sources</span>
        <Tooltip text="Shows the distribution of traffic sources over time." position="top">
          <InfoIcon size={16} className="text-[var(--text-secondary)] cursor-help" />
        </Tooltip>
      </div>

      {/* Chart Card */}
      <div className="w-full h-[256px] bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg pt-4 pb-2 px-4 flex flex-col">
        {/* Dropdown */}
        <div className="flex items-center gap-2 mb-3">
          <span className="body-text text-[var(--text-secondary)]">LLM influenced sources</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-2 py-1 rounded border border-[var(--border-default)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors">
                <span className="body-text text-[var(--text-primary)]">{getDropdownLabel()}</span>
                <ChevronSmallDownIcon size={16} className="text-[var(--text-secondary)]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {llmInfluencedOptions.map((source) => (
                <DropdownMenuCheckboxItem
                  key={source}
                  checked={selectedSources.includes(source)}
                  onCheckedChange={() => handleSourceToggle(source)}
                >
                  {source}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Chart */}
        <div className="flex-1 min-h-[140px]">
          <TrafficSourcesChart data={trafficSourcesData} height={160} />
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-end gap-x-4 gap-y-1 pt-4">
          {/* LLM referred first, then the rest */}
          {['LLM referred', 'Organic', 'Direct', 'Other'].map((name) => {
            const series = trafficSourcesData.find((s) => s.name === name);
            if (!series) return null;
            return (
              <div key={series.name} className="flex items-center gap-1.5">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: series.color }}
                />
                <span className="body-text text-[var(--text-secondary)]">{series.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TrafficSourcesSection;
