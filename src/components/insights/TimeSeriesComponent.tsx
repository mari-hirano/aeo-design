"use client";

import React from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { TimeSeriesChart, TimeSeriesDataPoint } from './TimeSeriesChart';

interface TimeSeriesComponentProps {
  className?: string;
  data?: TimeSeriesDataPoint[];
  defaultTab?: MetricTabId;
}

type MetricTabId = 'total-sessions' | 'unique-visitors' | 'bot-visitors';

// Chart configuration for each metric type
const CHART_CONFIG: Record<MetricTabId, { title: string; value: string; data: TimeSeriesDataPoint[]; yDomain: [number, number] }> = {
  'total-sessions': {
    title: 'Sessions',
    value: '5,294',
    data: [
      { date: "3/13", value: 2850 },
      { date: "3/14", value: 1800 },
      { date: "3/15", value: 2700 },
      { date: "3/16", value: 2400 },
      { date: "3/17", value: 2550 }
    ],
    yDomain: [1500, 3000]
  },
  'unique-visitors': {
    title: 'Unique visitors',
    value: '2,847',
    data: [
      { date: "3/13", value: 1520 },
      { date: "3/14", value: 980 },
      { date: "3/15", value: 1450 },
      { date: "3/16", value: 1280 },
      { date: "3/17", value: 1380 }
    ],
    yDomain: [800, 1600]
  },
  'bot-visitors': {
    title: 'Bot scrapers',
    value: '1,346',
    data: [
      { date: "3/13", value: 1085 },
      { date: "3/14", value: 1145 },
      { date: "3/15", value: 1155 },
      { date: "3/16", value: 1235 },
      { date: "3/17", value: 1192 }
    ],
    yDomain: [800, 1400]
  }
};

export function TimeSeriesComponent({ className = '', data, defaultTab = 'total-sessions' }: TimeSeriesComponentProps) {
  const { version } = useInsightsVersion();

  // Get chart configuration based on defaultTab
  const config = CHART_CONFIG[defaultTab];
  const chartData = data || config.data;

  return (
    <div className={`bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg flex flex-col gap-3 p-4 h-full ${className}`}>
      {/* Title and Value */}
      <div className="flex flex-col gap-0.5">
        <p className="body-text text-[11.5px] leading-[16px] tracking-[-0.115px] text-[var(--text-secondary)]">
          {config.title}
        </p>
        <p className="font-normal text-[24px] leading-[34px] text-[var(--text-primary)]">
          {config.value}
        </p>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <TimeSeriesChart 
          data={chartData}
          className="h-full w-full"
          yDomain={config.yDomain}
        />
      </div>
    </div>
  );
}

