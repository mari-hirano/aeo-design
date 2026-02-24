"use client";

import React, { useState } from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { TimeSeriesChart, TimeSeriesDataPoint } from './TimeSeriesChart';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './InsightsSelect';
import { GOALS_LIST, getGoalById } from '@/data/goals';

interface GoalsConversionWidgetProps {
  className?: string;
  data?: TimeSeriesDataPoint[];
}

export function GoalsConversionWidget({ className = '', data }: GoalsConversionWidgetProps) {
  const { version } = useInsightsVersion();
  const [selectedGoalId, setSelectedGoalId] = useState<string>(GOALS_LIST[0]?.id || '');
  
  const selectedGoal = getGoalById(selectedGoalId);
  const GoalIcon = selectedGoal?.icon;

  // Mock data - will be replaced with real data later
  const conversionRate = '3.23%';
  const conversions = 111;

  // Sample data matching Figma design (Y-axis: 4%, 3%, 2%, 1%, 0%)
  // Values estimated from the chart line in the design
  const defaultData: TimeSeriesDataPoint[] = data || [
    { date: "3/13", value: 1.2 },
    { date: "3/14", value: 2.5 },
    { date: "3/15", value: 3.1 },
    { date: "3/16", value: 2.8 },
    { date: "3/17", value: 3.5 }
  ];

  return (
    <div className={`bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-[8px] flex flex-col px-3 py-4 gap-4 h-full ${className}`}>
      {/* Goal Selector */}
      <div className="flex flex-col gap-1">
        <label className="body-text text-[var(--text-primary)]">Current goal</label>
        <Select value={selectedGoalId} onValueChange={setSelectedGoalId}>
          <SelectTrigger variant="button" icon={GoalIcon}>
            <SelectValue placeholder="Select a goal" />
          </SelectTrigger>
          <SelectContent>
            {GOALS_LIST.map((goal) => {
              const Icon = goal.icon;
              return (
                <SelectItem key={goal.id} value={goal.id} icon={Icon}>
                  {goal.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Conversion Metrics */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="body-text-bold text-[var(--text-primary)]" style={{ fontSize: '18px', lineHeight: '1.3' }}>
              {conversionRate} Conversion rate
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="body-text-bold text-[var(--text-primary)]">{conversions}</span>
          <span className="body-text text-[var(--text-secondary)] opacity-50">Conversions</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[130px]">
        <TimeSeriesChart 
          data={defaultData}
          className="h-full w-full"
          yDomain={[0, 4]} // Fixed Y-axis domain matching Figma design
        />
      </div>
    </div>
  );
}

