"use client";

import React from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { PageItem } from './PageItem';
import { TopCardContent } from './TopCardContent';

interface TopPageComponentProps {
  variant?: 'Static' | 'CMS';
  className?: string;
  pageName?: string;
  visits?: number;
  percentage?: string;
  sparklineData?: number[];
  sparklineColor?: 'green' | 'red';
}

export function TopPageComponent({ 
  variant = 'Static',
  className = '',
  pageName = 'Home',
  visits = 5290,
  percentage = '35% of visits',
  sparklineData,
  sparklineColor
}: TopPageComponentProps) {
  const { version } = useInsightsVersion();

  // Filter out height classes from className
  const filteredClassName = className
    .split(' ')
    .filter(cls => !cls.match(/^h-\[.*\]$|^h-\d+/))
    .join(' ');

  return (
    <div 
      className={`bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-[8px] flex flex-col px-3 py-4 ${filteredClassName}`}
    >
      <TopCardContent
        label={
          <PageItem 
            pageName={pageName}
            pageType={variant}
            size="default"
          />
        }
        visits={visits}
        percentage={percentage}
        sparklineData={sparklineData}
        sparklineColor={sparklineColor}
    />
    </div>
  );
}

