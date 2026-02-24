"use client";

import React from 'react';
import { TimeSeriesChart, TimeSeriesDataPoint } from './TimeSeriesChart';
import { Sparkline } from './Sparkline';
import { DonutChart } from './DonutChart';

interface TotalViewsSectionProps {
  className?: string;
  viewType?: 'sessions' | 'visitors' | 'bots';
}

// Configuration for each view type
const VIEW_CONFIG = {
  sessions: {
    title: 'Total sessions',
    value: '5,294',
  },
  visitors: {
    title: 'Unique visitors',
    value: '2,847',
  },
  bots: {
    title: 'Bot scraping',
    value: '1,346',
  },
};

export function TotalViewsSection({ className = '', viewType = 'sessions' }: TotalViewsSectionProps) {
  const config = VIEW_CONFIG[viewType];

  // Chart data for y-axis 0-4% and x-axis 3/1 to 3/7
  // Pattern: starts high ~3.8%, dips down to ~1.5%, then recovers to ~3.5%
  const chartData: TimeSeriesDataPoint[] = [
    { date: "3/1", value: 3.8 },
    { date: "3/2", value: 2.8 },
    { date: "3/3", value: 1.8 },
    { date: "3/4", value: 1.5 },
    { date: "3/5", value: 2.5 },
    { date: "3/6", value: 3.5 },
    { date: "3/7", value: 3.2 },
  ];

  // Sparkline data for bounce rate - different values for visitors view
  const bounceRateSparkline = viewType === 'visitors' 
    ? [22, 24, 23, 25, 24, 26, 25, 27, 26, 28]
    : [28, 29, 30, 29, 31, 30, 32, 31, 33, 32];
  
  const bounceRateValue = viewType === 'visitors' ? '28%' : '32%';

  // Viewport size donut chart data
  const viewportData = [
    { label: 'Desktop', value: 88.5, color: 'var(--blue-bg)' },
    { label: 'Mobile', value: 11.2, color: 'var(--purple-bg)' },
    { label: 'Tablet', value: 0.3, color: 'var(--pink-bg)' },
  ];

  return (
    <div className={`grid grid-cols-12 gap-3 ${className}`}>
      {/* Left Column - Chart with Tabs */}
      <div className="col-span-9">
        <div className="bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg flex flex-col h-full">
          {/* Title and Value */}
          <div className="px-4 pt-4 pb-3 flex flex-col gap-0.5">
            <p className="body-text text-[11.5px] leading-[16px] tracking-[-0.115px] text-[var(--text-secondary)]">
              {config.title}
            </p>
            <p className="font-normal text-[24px] leading-[34px] text-[var(--text-primary)]">
              {config.value}
            </p>
          </div>

          {/* Chart */}
          <div className="flex-1 pt-4 px-4 pb-2 min-h-[280px] flex flex-col">
            <TimeSeriesChart 
              data={chartData}
              className="h-full w-full"
              yDomain={[0, 4]}
            />
          </div>
        </div>
      </div>

      {/* Right Column - Bounce Rate & Viewport Size (or placeholders for Bots) */}
      <div className="col-span-3 flex flex-col gap-3">
        {viewType === 'bots' ? (
          <>
            {/* Placeholder Card 1 */}
            <div className="bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg p-4 flex-1 flex items-center justify-center">
              <p className="body-text text-[var(--text-secondary)]">Placeholder insights or recommendations</p>
            </div>

            {/* Placeholder Card 2 */}
            <div className="bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg p-4 flex-1 flex items-center justify-center">
              <p className="body-text text-[var(--text-secondary)]">Placeholder insights or recommendations</p>
            </div>
          </>
        ) : (
          <>
            {/* Bounce Rate Card */}
            <div className="bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg p-4 flex-1">
              <p className="body-text-bold text-[var(--text-primary)] mb-2">Bounce rate</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[32px] leading-[40px] text-[var(--text-primary)]">{bounceRateValue}</p>
                <Sparkline 
                  data={bounceRateSparkline} 
                  color="green"
                  width={80}
                  height={40}
                />
              </div>
            </div>

            {/* Viewport Size Card */}
            <div className="bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg p-4 flex-1">
              <p className="body-text-bold text-[var(--text-primary)] mb-3">Viewport size</p>
              <div className="flex flex-col items-center gap-3">
                <DonutChart 
                  data={viewportData}
                  size={100}
                  innerRadiusRatio={0.65}
                />
                {/* Legends */}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                  {viewportData.map((item) => (
                    <div key={item.label} className="flex items-center gap-1.5">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="body-text text-[var(--text-secondary)]">{item.label}</span>
                    </div>
                  ))}
                </div>
                {/* Percentages */}
                <div className="flex justify-center gap-4">
                  {viewportData.map((item) => (
                    <span key={item.label} className="body-text text-[var(--text-primary)]">
                      {item.value}%
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
