"use client";

import React from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { ElementButtonIcon, ElementLinkIcon } from '@/icons';
import { PageItem } from './PageItem';
import { TopCardContent } from './TopCardContent';

interface TopEventComponentProps {
  variant?: 'link (Page: cms)' | 'button (Page: static)' | 'button (Page: cms)';
  className?: string;
  eventName?: string;
  visits?: number;
  percentage?: string;
  pageName?: string;
  sparklineData?: number[];
  sparklineColor?: 'green' | 'red';
}

export function TopEventComponent({ 
  variant = 'button (Page: static)',
  className = '',
  eventName = 'Event',
  visits = 5256,
  percentage = '35% of visits',
  pageName = 'Page name',
  sparklineData,
  sparklineColor
}: TopEventComponentProps) {
  const { version } = useInsightsVersion();

  // Parse variant to extract event type and page type
  const parseVariant = () => {
    if (variant.includes('link')) {
      return { eventType: 'link' as const, pageType: 'CMS' as const };
    } else if (variant.includes('button')) {
      if (variant.includes('cms')) {
        return { eventType: 'button' as const, pageType: 'CMS' as const };
      }
      return { eventType: 'button' as const, pageType: 'Static' as const };
    }
    return { eventType: 'button' as const, pageType: 'Static' as const };
  };

  const { eventType, pageType } = parseVariant();

  // Filter out height classes from className
  const filteredClassName = className
    .split(' ')
    .filter(cls => !cls.match(/^h-\[.*\]$|^h-\d+/))
    .join(' ');

  // Get event icon
  const EventIcon = eventType === 'link' ? ElementLinkIcon : ElementButtonIcon;

  return (
    <div 
      className={`bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-[8px] flex flex-col gap-2 ${filteredClassName}`}
    >
      {/* Top content with padding */}
      <div className="px-3 pt-4 pb-0">
        <TopCardContent
          label={
            <div className="flex items-center gap-0.5 w-full">
              <p className="flex-1 font-semibold text-[13px] leading-[18px] overflow-hidden text-ellipsis whitespace-nowrap text-[var(--text-primary)]">
                {eventName}
              </p>
              {/* Event label */}
              <div className="flex items-center gap-1 shrink-0">
                <EventIcon size={16} className="text-[var(--text-secondary)]" />
                <p className="body-text text-[11.5px] leading-[16px] tracking-[-0.115px] overflow-hidden text-ellipsis whitespace-nowrap text-[var(--text-secondary)]">
                  {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
                </p>
              </div>
            </div>
          }
          visits={visits}
          percentage={percentage}
          sparklineData={sparklineData}
          sparklineColor={sparklineColor}
        />
      </div>

      {/* Bottom: Page item - full width, no padding */}
      <div className="bg-[var(--bg-tertiary)] flex items-center gap-2 px-3 py-2 w-full">
        <PageItem 
          pageName={pageName}
          pageType={pageType}
          size="small"
        />
      </div>
    </div>
  );
}
