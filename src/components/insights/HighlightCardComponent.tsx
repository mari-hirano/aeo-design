"use client";

import React from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { InfoIcon, ElementFormBlockIcon } from '@/icons';
import { PageItem } from './PageItem';
import { Sparkline } from './Sparkline';

interface HighlightCardComponentProps {
  variant?: 'graph' | 'page' | 'basic';
  className?: string;
  label?: string;
  value?: string | number;
  eventName?: string;
  pageUrl?: string;
  tooltip?: string;
  sparklineData?: number[];
  sparklineColor?: 'green' | 'red';
}

export function HighlightCardComponent({ 
  variant = 'basic',
  className = '',
  label,
  value,
  eventName = 'Event name',
  pageUrl = '/page',
  tooltip,
  sparklineData,
  sparklineColor
}: HighlightCardComponentProps) {
  // Get default label based on variant
  const getDefaultLabel = () => {
    if (label) return label;
    switch (variant) {
      case 'graph':
        return 'Bounce rate';
      case 'page':
        return 'Top event';
      case 'basic':
        return 'Top referrer';
      default:
        return 'Label';
    }
  };

  const displayLabel = getDefaultLabel();
  const { version } = useInsightsVersion();

  // Filter out height classes from className
  const filteredClassName = className
    .split(' ')
    .filter(cls => !cls.match(/^h-\[.*\]$|^h-\d+/))
    .join(' ');

  // Determine if URL is CMS based on common CMS patterns
  // This is a simple heuristic - can be enhanced based on actual URL patterns
  const getPageTypeFromUrl = (url: string): 'Static' | 'CMS' => {
    // Common CMS patterns: /blog/, /posts/, /articles/, etc.
    // Or if URL contains collection-like patterns
    if (url.includes('/blog/') || url.includes('/posts/') || url.includes('/articles/')) {
      return 'CMS';
    }
    return 'Static';
  };

  const pageType = variant === 'page' ? getPageTypeFromUrl(pageUrl) : 'Static';

  // Get default values based on variant
  const getDefaultValue = () => {
    if (value !== undefined) return value;
    switch (variant) {
      case 'graph':
        return '32%';
      case 'page':
        return eventName;
      case 'basic':
        return 'google.com';
      default:
        return '';
    }
  };

  const displayValue = getDefaultValue();

  return (
    <div 
      className={`bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-[8px] flex flex-col gap-3 px-3 py-4 h-full ${filteredClassName}`}
    >
      {/* Card Label */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1">
          <p className="body-text-bold text-[11.5px] leading-[16px] text-[var(--text-primary)]">
            {displayLabel}
          </p>
          {tooltip && (
            <InfoIcon 
              size={16} 
              className="text-[var(--text-secondary)] opacity-0" 
            />
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col gap-1 w-full">
        {variant === 'graph' && (
          <div className="flex items-center justify-between w-full">
            <p className="font-normal text-[24px] leading-[34px] overflow-hidden text-ellipsis whitespace-nowrap pr-2">
              {displayValue}
            </p>
            <div className="flex-1 flex items-center justify-center self-stretch min-w-[48px] max-w-[80px]">
              <Sparkline 
                className="w-full" 
                data={sparklineData}
                color={sparklineColor}
              />
            </div>
          </div>
        )}

        {variant === 'page' && (
          <div className="flex flex-col gap-1 items-start w-full">
            <div className="flex items-center gap-1 w-full">
              <ElementFormBlockIcon 
                size={16} 
                className="text-[var(--text-secondary)] shrink-0" 
              />
              <p className="font-semibold text-[13px] leading-[18px] overflow-hidden text-ellipsis whitespace-nowrap text-[var(--text-primary)]">
                {displayValue}
              </p>
            </div>
            <p className={`body-text-bold text-[11.5px] leading-[16px] overflow-hidden text-ellipsis whitespace-nowrap w-full ${
              pageType === 'CMS' ? 'text-[var(--text-purple)]' : 'text-[var(--text-secondary)]'
            }`}>
              {pageUrl}
            </p>
          </div>
        )}

        {variant === 'basic' && (
          <p className="font-semibold text-[13px] leading-[18px] overflow-hidden text-ellipsis whitespace-nowrap text-[var(--text-primary)]">
            {displayValue}
          </p>
        )}
      </div>
    </div>
  );
}
