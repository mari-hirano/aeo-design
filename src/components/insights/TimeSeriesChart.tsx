"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

export interface TimeSeriesDataPoint {
  date: string;  // Date string (e.g., "2024-03-13" or "3/13")
  value: number; // Numeric value
}

export interface MultiLineDataSeries {
  id: string;
  label: string;
  color: string;
  data: TimeSeriesDataPoint[];
  strokeWidth?: number; // Optional stroke width for emphasis (default 1.5)
  strokeDasharray?: string; // Optional dashed/dotted line (e.g. "4 4" for dashed, "2 3" for dotted)
}

interface TimeSeriesChartProps {
  data?: TimeSeriesDataPoint[];
  multiLineData?: MultiLineDataSeries[];
  showLegend?: boolean;
  className?: string;
  width?: number;
  height?: number;
  yDomain?: [number, number]; // Optional fixed Y-axis domain [min, max]
  yAxisSuffix?: string; // Optional suffix for Y-axis labels (e.g., "%")
  curve?: 'monotone' | 'linear'; // 'linear' for sharp/angular lines, 'monotone' for smooth (default)
}

export function TimeSeriesChart({ 
  data = [], 
  multiLineData,
  showLegend = false,
  className = '',
  width,
  height,
  yDomain,
  yAxisSuffix,
  curve = 'monotone'
}: TimeSeriesChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientIdRef = useRef<string>(`chartGradient-${Math.random().toString(36).substr(2, 9)}`);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; date: string; value: number; seriesLabel?: string } | null>(null);

  // Determine if we're in multi-line mode
  const isMultiLine = multiLineData && multiLineData.length > 0;

  // Default dimensions
  const defaultWidth = width || 400;
  const defaultHeight = height || 200;
  
  // Reserve space for legend if showing
  const legendHeight = showLegend ? 32 : 0;

  useEffect(() => {
    // Check if we have data to render
    const hasData = isMultiLine 
      ? multiLineData && multiLineData.length > 0 && multiLineData.some(s => s.data.length > 0)
      : data.length > 0;
    
    if (!svgRef.current || !containerRef.current || !hasData) {
      return;
    }

    // Get container dimensions or use defaults
    const containerWidth = width || containerRef.current.clientWidth || defaultWidth;
    const containerHeight = (height || containerRef.current.clientHeight || defaultHeight) - legendHeight;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up SVG
    const svg = d3.select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", containerHeight);

    // Set up margins
    // Right margin for Y-axis labels, bottom margin for X-axis labels
    // Top margin to prevent clipping of Y-axis labels, bottom margin for X-axis spacing
    const margin = { top: 8, right: 32, bottom: 32, left: 8 };
    const chartWidth = containerWidth - margin.left - margin.right;
    const chartHeight = containerHeight - margin.top - margin.bottom;

    // For multi-line, collect all dates and values
    const allDates = isMultiLine 
      ? Array.from(new Set(multiLineData!.flatMap(s => s.data.map(d => d.date))))
      : data.map(d => d.date);
    
    const allValues = isMultiLine
      ? multiLineData!.flatMap(s => s.data.map(d => d.value))
      : data.map(d => d.value);

    // Create scales
    // Use scaleBand to align first and last points with chart edges
    const xScale = d3.scaleBand<string>()
      .domain(allDates)
      .range([0, chartWidth])
      .paddingOuter(0)  // No padding at edges
      .paddingInner(0); // No padding between bands

    // Use fixed domain if provided, otherwise calculate from data
    let yMin: number, yMax: number;
    if (yDomain) {
      [yMin, yMax] = yDomain;
    } else {
      const valueExtent = d3.extent(allValues) as [number, number];
      yMin = Math.max(0, valueExtent[0] - (valueExtent[1] - valueExtent[0]) * 0.1);
      yMax = valueExtent[1] + (valueExtent[1] - valueExtent[0]) * 0.1;
    }
    
    const yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([chartHeight, 0])
      .nice();

    // Generate Y-axis tick values (4 ticks, or use fixed ticks if domain is fixed)
    // For fixed domain [0, 4], generate ticks: [4, 3, 2, 1, 0] to match Figma design
    // For fixed domain [0, 2], generate ticks: [2, 1, 0] to match Performance chart design
    // For fixed domain [1500, 3000], generate ticks: [3000, 2500, 2000, 1500] (4 ticks)
    // For fixed domain [0, 500], generate ticks: [500, 400, 300, 200, 100, 0] (bot visitors)
    const yTicks = yDomain 
      ? (yDomain[0] === 0 && yDomain[1] === 4 
          ? [4, 3, 2, 1, 0] 
          : yDomain[0] === 0 && yDomain[1] === 2
          ? [2, 1, 0]
          : yDomain[0] === 1500 && yDomain[1] === 3000
          ? [3000, 2500, 2000, 1500]
          : yDomain[0] === 0 && yDomain[1] === 500
          ? [500, 400, 300, 200, 100, 0]
          : d3.range(yMax, yMin - 0.1, -(yMax - yMin) / 4))
      : yScale.ticks(4);

    const curveFactory = curve === 'linear' ? d3.curveLinear : d3.curveMonotoneX;

    // Create defs for gradients and clipPath (must be before elements that reference them)
    const defs = svg.append("defs");

    // Create line generator
    // Use band start for first point (x=0), band end for last point (x=chartWidth), centers for middle points
    const line = d3.line<TimeSeriesDataPoint>()
      .x((d, i) => {
        const xPos = xScale(d.date);
        if (xPos === undefined) return 0;
        // First point: use band start (0)
        if (i === 0) return xPos;
        // Last point: use band end (chartWidth)
        if (i === data.length - 1) return xPos + xScale.bandwidth();
        // Middle points: use band center
        return xPos + xScale.bandwidth() / 2;
      })
      .y((d) => yScale(d.value))
      .curve(curveFactory);

    // Create area generator for gradient fill
    // Use same positioning logic as line
    const area = d3.area<TimeSeriesDataPoint>()
      .x((d, i) => {
        const xPos = xScale(d.date);
        if (xPos === undefined) return 0;
        // First point: use band start (0)
        if (i === 0) return xPos;
        // Last point: use band end (chartWidth)
        if (i === data.length - 1) return xPos + xScale.bandwidth();
        // Middle points: use band center
        return xPos + xScale.bandwidth() / 2;
      })
      .y0(chartHeight) // Bottom of chart
      .y1((d) => yScale(d.value))
      .curve(curveFactory);

    // Define clipPath to contain chart content within bounds
    const clipId = `chartClip-${Math.random().toString(36).substr(2, 9)}`;
    defs.append("clipPath")
      .attr("id", clipId)
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    // Create group for chart (clipped to chart area)
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("clip-path", `url(#${clipId})`);

    // Define gradient for blue fill (with unique ID to avoid conflicts)
    const gradient = defs.append("linearGradient")
      .attr("id", gradientIdRef.current)
      .attr("gradientUnits", "objectBoundingBox") // Relative to the element's bounding box
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgba(59, 130, 246, 0.4)") // Lighter blue with transparency
      .attr("stop-opacity", 1);

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgba(59, 130, 246, 0.1)") // Even lighter blue at bottom
      .attr("stop-opacity", 1);

    // Draw horizontal grid lines (matching Figma design)
    yTicks.forEach((tick) => {
      g.append("line")
        .attr("x1", 0)
        .attr("x2", chartWidth)
        .attr("y1", yScale(tick))
        .attr("y2", yScale(tick))
        .attr("stroke", "rgba(255, 255, 255, 0.13)") // Subtle white grid lines
        .attr("stroke-width", 1)
        .attr("opacity", 1);
    });

    if (isMultiLine && multiLineData) {
      // Draw multiple lines without area fill
      multiLineData.forEach((series) => {
        // Create line generator for this series
        const seriesLine = d3.line<TimeSeriesDataPoint>()
          .x((d, i) => {
            const xPos = xScale(d.date);
            if (xPos === undefined) return 0;
            if (i === 0) return xPos;
            if (i === series.data.length - 1) return xPos + xScale.bandwidth();
            return xPos + xScale.bandwidth() / 2;
          })
          .y((d) => yScale(d.value))
          .curve(curveFactory);

        const path = g.append("path")
          .datum(series.data)
          .attr("fill", "none")
          .attr("stroke", series.color)
          .attr("stroke-width", series.strokeWidth ?? 1.5)
          .attr("d", seriesLine);
        if (series.strokeDasharray) {
          path.attr("stroke-dasharray", series.strokeDasharray);
        }
      });
    } else {
      // Single line mode - draw area fill (gradient)
      g.append("path")
        .datum(data)
        .attr("fill", `url(#${gradientIdRef.current})`)
        .attr("d", area);

      // Draw line (blue)
      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#3b82f6") // Blue stroke (#3b82f6)
        .attr("stroke-width", 1.5)
        .attr("d", line);
    }

    // Draw Y-axis labels on the right
    // Only show labels for non-zero ticks (matching Figma design which shows 4%, 3%, 2%, 1%)
    const yAxisGroup = svg.append("g")
      .attr("transform", `translate(${containerWidth - margin.right},${margin.top})`);

    yTicks.forEach((tick) => {
      // Skip label for 0 (bottom tick) for percentage domains [0, 4] and [0, 2] to match Figma design
      // But show 0 for other domains like [0, 500]
      if (tick === 0 && yDomain && yDomain[0] === 0 && (yDomain[1] === 4 || yDomain[1] === 2)) return;
      
      const y = yScale(tick);
      // Format number with commas for large values (e.g., 3,000)
      const formattedValue = tick >= 1000 
        ? tick.toLocaleString('en-US', { maximumFractionDigits: 0 })
        : tick.toFixed(0);
      
      // Add suffix if provided, or add % for specific percentage domains [0, 4] or [0, 2]
      const suffix = yAxisSuffix !== undefined 
        ? yAxisSuffix 
        : (yDomain && (yDomain[0] === 0 && (yDomain[1] === 4 || yDomain[1] === 2))) 
          ? '%' 
          : '';
      const label = `${formattedValue}${suffix}`;
      
      yAxisGroup.append("text")
        .attr("x", 24) // Offset to the right to avoid overlap with grid lines
        .attr("y", y)
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "11.5px")
        .attr("line-height", "16px")
        .style("fill", "var(--text-secondary)") // Use theme CSS variable
        .text(label);
    });

    // Draw X-axis labels on the bottom
    // Position labels with some padding from the bottom edge
    const xAxisGroup = svg.append("g")
      .attr("transform", `translate(${margin.left},${containerHeight - margin.bottom + 8})`);

    // Calculate if we have enough space to show all labels (assume ~40px per label)
    const labelWidth = 40;
    const maxLabels = Math.floor(chartWidth / labelWidth);
    const showAllLabels = maxLabels >= allDates.length;

    allDates.forEach((date, index) => {
      // If not enough space, only show first and last labels
      if (!showAllLabels && index !== 0 && index !== allDates.length - 1) {
        return;
      }
      
      const xPos = xScale(date);
      // Use band center position for label alignment
      const x = xPos !== undefined ? xPos + xScale.bandwidth() / 2 : 0;
      xAxisGroup.append("text")
        .attr("x", x)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "hanging")
        .attr("font-size", "11.5px")
        .attr("line-height", "16px")
        .style("fill", "var(--text-secondary)") // Use theme CSS variable
        .text(date);
    });

    // Add invisible overlay for hover detection
    const overlay = g.append("rect")
      .attr("width", chartWidth)
      .attr("height", chartHeight)
      .attr("fill", "transparent")
      .style("cursor", "crosshair");

    // Add hover interaction
    overlay
      .on("mousemove", function(event) {
        const [mouseX, mouseY] = d3.pointer(event, this);
        
        if (isMultiLine && multiLineData) {
          // Multi-line mode: find closest point across all series
          let closestPoint: { series: MultiLineDataSeries; point: TimeSeriesDataPoint; x: number; y: number } | null = null;
          let minDistance = Infinity;
          
          multiLineData.forEach((series) => {
            series.data.forEach((d, i) => {
              const xPos = xScale(d.date);
              if (xPos === undefined) return;
              let x: number;
              if (i === 0) {
                x = xPos;
              } else if (i === series.data.length - 1) {
                x = xPos + xScale.bandwidth();
              } else {
                x = xPos + xScale.bandwidth() / 2;
              }
              const y = yScale(d.value);
              const distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
              if (distance < minDistance) {
                minDistance = distance;
                closestPoint = { series, point: d, x, y };
              }
            });
          });
          
          if (closestPoint !== null) {
            const cp = closestPoint as { series: MultiLineDataSeries; point: TimeSeriesDataPoint; x: number; y: number };
            setTooltip({
              x: cp.x + margin.left,
              y: cp.y + margin.top,
              date: cp.point.date,
              value: cp.point.value,
              seriesLabel: cp.series.label
            });
          }
        } else {
          // Single line mode
          let closestIndex = 0;
          let minDistance = Infinity;
          
          data.forEach((d, i) => {
            const xPos = xScale(d.date);
            if (xPos === undefined) return;
            let x: number;
            if (i === 0) {
              x = xPos;
            } else if (i === data.length - 1) {
              x = xPos + xScale.bandwidth();
            } else {
              x = xPos + xScale.bandwidth() / 2;
            }
            const distance = Math.abs(mouseX - x);
            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = i;
            }
          });

          const point = data[closestIndex];
          const xPos = xScale(point.date);
          let x: number;
          if (closestIndex === 0) {
            x = xPos !== undefined ? xPos : 0;
          } else if (closestIndex === data.length - 1) {
            x = xPos !== undefined ? xPos + xScale.bandwidth() : chartWidth;
          } else {
            x = xPos !== undefined ? xPos + xScale.bandwidth() / 2 : 0;
          }
          const y = yScale(point.value);
          
          setTooltip({
            x: x + margin.left,
            y: y + margin.top,
            date: point.date,
            value: point.value
          });
        }
      })
      .on("mouseout", () => {
        setTooltip(null);
      });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, multiLineData, width, height, defaultWidth, defaultHeight, yDomain?.[0], yDomain?.[1], legendHeight, curve]);

  // Check if we have data to display
  const hasData = isMultiLine 
    ? multiLineData && multiLineData.length > 0 && multiLineData.some(s => s.data.length > 0)
    : data.length > 0;

  if (!hasData) {
    return (
      <div ref={containerRef} className={`flex items-center justify-center ${className}`}>
        <div className="text-[var(--text-dimmed)] body-text text-[11.5px]">No data</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative flex flex-col ${className}`} style={{ width: width || '100%', height: height || '100%' }}>
      <svg ref={svgRef} style={{ flex: 1, minHeight: 0 }} />
      {tooltip && (
        <div
          className="absolute pointer-events-none bg-[var(--bg-raised)] border border-[var(--border-default)] rounded px-2 py-1 shadow-lg z-10"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 20}px`,
            transform: 'translateX(-50%)',
            fontSize: '11.5px',
            lineHeight: '16px',
            color: 'var(--text-primary)'
          }}
        >
          {tooltip.seriesLabel && <div className="font-medium">{tooltip.seriesLabel}</div>}
          <div>{tooltip.date}</div>
          <div>{tooltip.value.toLocaleString()}</div>
        </div>
      )}
      {showLegend && multiLineData && (
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 pt-2" style={{ height: legendHeight }}>
          {multiLineData.map((series) => (
            <div key={series.id} className="flex items-center gap-1.5">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: series.color }}
              />
              <span className="body-text text-[11.5px] text-[var(--text-secondary)]">
                {series.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

