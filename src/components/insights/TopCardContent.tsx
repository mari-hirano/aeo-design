"use client";

import React from 'react';
import { Sparkline } from './Sparkline';

interface TopCardContentProps {
  label: React.ReactNode;
  visits: number;
  percentage: string;
  className?: string;
  sparklineData?: number[];
  sparklineColor?: 'green' | 'red';
}

export function TopCardContent({ 
  label,
  visits,
  percentage,
  className = '',
  sparklineData,
  sparklineColor
}: TopCardContentProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Label */}
      {label}

      {/* Metrics */}
      <div className="flex items-center justify-between w-full">
        {/* Left: Number and percentage */}
        <div className="flex flex-col gap-2 items-start justify-center flex-1 pr-2">
          <p className="font-normal text-[24px] leading-[34px] overflow-hidden text-ellipsis whitespace-nowrap w-full">
            {visits.toLocaleString()}
          </p>
          <p className="body-text text-[11.5px] leading-[16px] tracking-[-0.115px] overflow-hidden text-ellipsis whitespace-nowrap w-full text-[var(--text-secondary)]">
            {percentage}
          </p>
        </div>

        {/* Right: Sparkline */}
        <div className="flex-1 flex items-center justify-center self-stretch min-w-[48px] max-w-[80px]">
          <Sparkline 
            className="w-full" 
            data={sparklineData}
            color={sparklineColor}
          />
        </div>
      </div>
    </div>
  );
}

