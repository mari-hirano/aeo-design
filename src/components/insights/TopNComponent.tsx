"use client";

import React, { useState } from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/spring-ui/select';
import { Button } from '@/components/spring-ui/button';
import { ProgressBar } from '@/components/spring-ui/ProgressBar';
import { InfoIcon } from '@/icons';

interface TopNComponentProps {
  variant?: 'audience' | 'technology' | 'traffic-sources';
  className?: string;
  viewType?: 'sessions' | 'visitors';
}

// Sub-variant mappings
const SUB_VARIANTS = {
  audience: ['Country', 'City', 'State/Province', 'DMA'],
  technology: ['Operating System', 'Device Type', 'Browser'],
  'traffic-sources': ['Type', 'Referral Domain'],
} as const;

// Title text for each variant
const VARIANT_TITLES = {
  audience: 'Audience by',
  technology: 'Technology by',
  'traffic-sources': 'Traffic sources by',
} as const;

// Mock data for each variant/sub-variant combination (sessions view)
const MOCK_DATA: Record<string, Array<{ label: string; sessions: number }>> = {
  'audience-Country': [
    { label: 'United States', sessions: 3022 },
    { label: 'Australia', sessions: 876 },
    { label: 'France', sessions: 532 },
    { label: 'Ireland', sessions: 244 },
    { label: 'United Kingdom', sessions: 33 },
  ],
  'audience-City': [
    { label: 'New York', sessions: 1520 },
    { label: 'Los Angeles', sessions: 980 },
    { label: 'Chicago', sessions: 522 },
  ],
  'audience-State/Province': [
    { label: 'California', sessions: 2100 },
    { label: 'New York', sessions: 1500 },
    { label: 'Texas', sessions: 800 },
  ],
  'audience-DMA': [
    { label: 'New York', sessions: 1800 },
    { label: 'Los Angeles', sessions: 1200 },
    { label: 'Chicago', sessions: 600 },
  ],
  'technology-Operating System': [
    { label: 'Windows', sessions: 2800 },
    { label: 'macOS', sessions: 1200 },
    { label: 'Linux', sessions: 400 },
  ],
  'technology-Device Type': [
    { label: 'Desktop', sessions: 2500 },
    { label: 'Mobile', sessions: 1500 },
    { label: 'Tablet', sessions: 400 },
  ],
  'technology-Browser': [
    { label: 'Chrome', sessions: 3022 },
    { label: 'Firefox', sessions: 876 },
    { label: 'Safari', sessions: 532 },
  ],
  'traffic-sources-Type': [
    { label: 'Organic', sessions: 3022 },
    { label: 'Generative AI', sessions: 876 },
    { label: 'Direct', sessions: 532 },
    { label: 'Paid social', sessions: 532 },
    { label: 'Paid search', sessions: 532 },
  ],
  'traffic-sources-Referral Domain': [
    { label: 'google.com', sessions: 1800 },
    { label: 'facebook.com', sessions: 900 },
    { label: 'twitter.com', sessions: 500 },
  ],
};

// Mock data for visitors view (different numbers)
const MOCK_DATA_VISITORS: Record<string, Array<{ label: string; sessions: number }>> = {
  'audience-Country': [
    { label: 'United States', sessions: 1845 },
    { label: 'Australia', sessions: 512 },
    { label: 'France', sessions: 298 },
    { label: 'Ireland', sessions: 156 },
    { label: 'United Kingdom', sessions: 22 },
  ],
  'audience-City': [
    { label: 'New York', sessions: 892 },
    { label: 'Los Angeles', sessions: 645 },
    { label: 'Chicago', sessions: 308 },
  ],
  'audience-State/Province': [
    { label: 'California', sessions: 1250 },
    { label: 'New York', sessions: 920 },
    { label: 'Texas', sessions: 480 },
  ],
  'audience-DMA': [
    { label: 'New York', sessions: 1100 },
    { label: 'Los Angeles', sessions: 780 },
    { label: 'Chicago', sessions: 390 },
  ],
  'technology-Operating System': [
    { label: 'Windows', sessions: 1680 },
    { label: 'macOS', sessions: 720 },
    { label: 'Linux', sessions: 245 },
  ],
  'technology-Device Type': [
    { label: 'Desktop', sessions: 1520 },
    { label: 'Mobile', sessions: 920 },
    { label: 'Tablet', sessions: 205 },
  ],
  'technology-Browser': [
    { label: 'Chrome', sessions: 1845 },
    { label: 'Firefox', sessions: 512 },
    { label: 'Safari', sessions: 288 },
  ],
  'traffic-sources-Type': [
    { label: 'Organic', sessions: 1845 },
    { label: 'Generative AI', sessions: 512 },
    { label: 'Direct', sessions: 298 },
    { label: 'Paid social', sessions: 298 },
    { label: 'Paid search', sessions: 298 },
  ],
  'traffic-sources-Referral Domain': [
    { label: 'google.com', sessions: 1100 },
    { label: 'facebook.com', sessions: 540 },
    { label: 'twitter.com', sessions: 305 },
  ],
};

// Row component
interface TopNRowProps {
  label: string;
  sessions: number;
  maxSessions: number;
}

function TopNRow({ label, sessions, maxSessions }: TopNRowProps) {
  return (
    <div className="flex items-center gap-2 w-full h-4">
      {/* Left: Label */}
      <div className="flex-1 min-w-0">
        <p className="body-text text-[11.5px] leading-[16px] tracking-[-0.115px] text-[var(--text-secondary)] overflow-hidden text-ellipsis whitespace-nowrap">
          {label}
        </p>
      </div>
      
      {/* Right: Progress bar + Metric value */}
      <div className="flex items-center gap-[3px] flex-1 min-w-0">
        <div className="flex-1 min-w-0">
          <ProgressBar stepCount={sessions} denominator={maxSessions} size="Small" />
        </div>
        <div className="flex-shrink-0 w-[36px] text-right">
          <p className="body-text text-[11.5px] leading-[16px] tracking-[-0.115px] text-[var(--text-primary)]">
            {sessions.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TopNComponent({ 
  variant = 'audience',
  className = '',
  viewType = 'sessions'
}: TopNComponentProps) {
  const { version } = useInsightsVersion();
  
  // Get sub-variants for current variant
  const subVariants = SUB_VARIANTS[variant];
  
  // State for selected sub-variant
  const [selectedSubVariant, setSelectedSubVariant] = useState<string>(subVariants[0]);
  
  // Get data for current variant + sub-variant combination based on viewType
  const dataKey = `${variant}-${selectedSubVariant}`;
  const dataSource = viewType === 'visitors' ? MOCK_DATA_VISITORS : MOCK_DATA;
  const items = dataSource[dataKey] || [];
  
  // Use the first item's sessions as the denominator (top number = 100%)
  // This ensures the top item is always 100% and others are relative to it
  const maxSessions = items.length > 0 ? items[0].sessions : 0;

  return (
    <div 
      className={`bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-[8px] flex flex-col px-4 pt-6 pb-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {/* Left: Title + Select + Info icon */}
        <div className="flex items-center gap-1 flex-1 min-w-0">
          <span className="body-text-bold text-[11.5px] leading-[16px] text-[var(--text-primary)] whitespace-nowrap">
            {VARIANT_TITLES[variant]}
          </span>
          <Select value={selectedSubVariant} onValueChange={setSelectedSubVariant}>
            <SelectTrigger variant="button" className="h-6 px-2 w-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {subVariants.map((subVariant) => (
                <SelectItem key={subVariant} value={subVariant}>
                  {subVariant}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <InfoIcon size={16} className="text-[var(--text-secondary)] opacity-50 flex-shrink-0" />
        </div>
        
        {/* Right: Sessions/Visitors label */}
        <div className="flex-shrink-0">
          <span className="body-text-bold text-[11.5px] leading-[16px] text-[var(--text-primary)] whitespace-nowrap">
            {viewType === 'visitors' ? 'Visitors' : 'Sessions'}
          </span>
        </div>
      </div>
      
      {/* Content: List of items */}
      <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto">
        {items.map((item, index) => (
          <TopNRow
            key={index}
            label={item.label}
            sessions={item.sessions}
            maxSessions={maxSessions}
          />
        ))}
      </div>
      
      {/* Footer: Show all button (conditional) - always reserve space */}
      <div className="mt-4 flex justify-center items-center h-6 flex-shrink-0">
        {items.length >= 5 ? (
          <Button variant="outline" size="compact">
            Show all
          </Button>
        ) : (
          <div className="h-6" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
