"use client";

import React from 'react';
import { DonutChart } from './DonutChart';

interface BotInsightsSectionProps {
  className?: string;
}

export function BotInsightsSection({ className = '' }: BotInsightsSectionProps) {
  // Citation percentage data - this page vs rest of site
  const citationData = [
    { label: 'This page', value: 30, color: 'var(--blue-bg)' },
    { label: 'Rest of site', value: 70, color: 'var(--border-default)' },
  ];

  return (
    <div className={`${className}`}>
      <div className="bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg py-4 px-4 flex flex-col h-full">
        <h3 className="body-text-bold text-[var(--text-primary)] mb-3">Citation % relative to the site</h3>
        <div className="flex-1 flex items-center justify-center">
          {/* Donut chart with legend in center */}
          <div className="relative">
            <DonutChart 
              data={citationData}
              size={190}
              innerRadiusRatio={0.7}
            />
            {/* Legend in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--blue-bg)]" />
                  <span className="body-text text-[var(--text-secondary)]">This page</span>
                  <span className="body-text text-[var(--text-primary)]">30%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[var(--border-default)]" />
                  <span className="body-text text-[var(--text-secondary)]">Rest of site</span>
                  <span className="body-text text-[var(--text-primary)]">70%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
