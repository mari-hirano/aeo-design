"use client";

import React, { useState } from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { InfoIcon, ChevronSmallDownIcon } from '@/icons';
import Tooltip from '@/components/spring-ui/tooltip';
import { Button } from '@/components/spring-ui/button';

// Traffic source categories with colors
const TRAFFIC_CATEGORIES = [
  { id: 'organic', label: 'Organic', color: '#9333ea', percentage: 51 },
  { id: 'direct', label: 'Direct', color: '#22d3ee', percentage: 42 },
  { id: 'llm', label: 'LLM', color: '#3b82f6', percentage: 2 },
  { id: 'email', label: 'Email', color: '#da6d95', percentage: 3 },
  { id: 'paid-search', label: 'Paid search', color: '#f59e0b', percentage: 2 },
] as const;

type CategoryId = typeof TRAFFIC_CATEGORIES[number]['id'];

// Referrer data type
interface ReferrerData {
  id: string;
  name: string;
  favicon?: string;
  category: 'Search' | 'Other' | 'Social' | 'AI';
  sessions: number;
  visitors: number;
  conversions: number;
  conversionRate: number;
  tags?: string[];
}

// Mock data for organic referrers
const ORGANIC_REFERRERS: ReferrerData[] = [
  { id: '1', name: 'Google', category: 'Search', sessions: 8505, visitors: 6234, conversions: 187, conversionRate: 2.2, tags: ['Most traffic', 'Highest converting'] },
  { id: '2', name: 'g2.com', category: 'Other', sessions: 702, visitors: 521, conversions: 50, conversionRate: 7.1 },
  { id: '3', name: 'capterra.com', category: 'Other', sessions: 350, visitors: 289, conversions: 25, conversionRate: 7.1 },
  { id: '4', name: 'zapier.com', category: 'Other', sessions: 123, visitors: 98, conversions: 22, conversionRate: 18.3 },
  { id: '5', name: 'Bing', category: 'Search', sessions: 608, visitors: 456, conversions: 12, conversionRate: 2.0 },
  { id: '6', name: 'getapp.com', category: 'Other', sessions: 153, visitors: 121, conversions: 8, conversionRate: 5.3 },
  { id: '7', name: 'linkedin.com', category: 'Social', sessions: 706, visitors: 534, conversions: 7, conversionRate: 1.0 },
  { id: '8', name: 'stackoverflow.com', category: 'Other', sessions: 121, visitors: 89, conversions: 6, conversionRate: 5.0 },
  { id: '9', name: 'DuckDuckGo', category: 'Search', sessions: 203, visitors: 167, conversions: 4, conversionRate: 2.0 },
  { id: '10', name: 'ChatGPT', category: 'AI', sessions: 155, visitors: 132, conversions: 4, conversionRate: 2.7 },
];

// Mock data for direct referrers
const DIRECT_REFERRERS: ReferrerData[] = [
  { id: '1', name: 'Direct traffic', category: 'Other', sessions: 4200, visitors: 3100, conversions: 89, conversionRate: 2.1 },
  { id: '2', name: 'Bookmarks', category: 'Other', sessions: 1500, visitors: 1200, conversions: 32, conversionRate: 2.1 },
];

// Mock data for LLM referrers
const LLM_REFERRERS: ReferrerData[] = [
  { id: '1', name: 'ChatGPT', category: 'AI', sessions: 155, visitors: 132, conversions: 4, conversionRate: 2.7 },
  { id: '2', name: 'Claude', category: 'AI', sessions: 89, visitors: 76, conversions: 2, conversionRate: 2.2 },
  { id: '3', name: 'Perplexity', category: 'AI', sessions: 67, visitors: 54, conversions: 1, conversionRate: 1.5 },
  { id: '4', name: 'Gemini', category: 'AI', sessions: 45, visitors: 38, conversions: 1, conversionRate: 2.2 },
];

// Data by category
const REFERRERS_BY_CATEGORY: Record<CategoryId, ReferrerData[]> = {
  'organic': ORGANIC_REFERRERS,
  'direct': DIRECT_REFERRERS,
  'llm': LLM_REFERRERS,
  'email': [],
  'paid-search': [],
};

interface TrafficSourcesTableSectionProps {
  className?: string;
  viewType?: 'sessions' | 'visitors';
}

export function TrafficSourcesTableSection({ className = '', viewType = 'sessions' }: TrafficSourcesTableSectionProps) {
  const { version } = useInsightsVersion();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('organic');
  const [sortColumn, setSortColumn] = useState<'conversions' | 'sessions' | 'conversionRate'>('conversions');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const referrers = REFERRERS_BY_CATEGORY[activeCategory] || [];
  const activeConfig = TRAFFIC_CATEGORIES.find(c => c.id === activeCategory);

  // Calculate totals
  const totalSessions = referrers.reduce((sum, r) => sum + r.sessions, 0);
  const totalVisitors = referrers.reduce((sum, r) => sum + r.visitors, 0);
  const totalConversions = referrers.reduce((sum, r) => sum + r.conversions, 0);
  const avgConversionRate = totalSessions > 0 ? (totalConversions / totalSessions * 100) : 0;

  // Sort referrers
  const sortedReferrers = [...referrers].sort((a, b) => {
    const aVal = sortColumn === 'sessions' ? (viewType === 'visitors' ? a.visitors : a.sessions) : 
                 sortColumn === 'conversions' ? a.conversions : a.conversionRate;
    const bVal = sortColumn === 'sessions' ? (viewType === 'visitors' ? b.visitors : b.sessions) : 
                 sortColumn === 'conversions' ? b.conversions : b.conversionRate;
    return sortDirection === 'desc' ? bVal - aVal : aVal - bVal;
  });

  const handleSort = (column: 'conversions' | 'sessions' | 'conversionRate') => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const metricLabel = viewType === 'visitors' ? 'Visitors' : 'Sessions';
  const getMetricValue = (r: ReferrerData) => viewType === 'visitors' ? r.visitors : r.sessions;
  const totalMetric = viewType === 'visitors' ? totalVisitors : totalSessions;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center gap-1">
        <span className="body-text-bold text-[var(--text-secondary)]">Traffic sources</span>
        <Tooltip text="Shows traffic sources and their conversion performance." position="top">
          <InfoIcon size={16} className="text-[var(--text-secondary)] cursor-help" />
        </Tooltip>
      </div>

      {/* Stacked Bar Chart */}
      <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
        <div className="flex items-end gap-1 h-[49px]">
          {TRAFFIC_CATEGORIES.filter(c => c.percentage > 0).map((category) => (
            <div 
              key={category.id}
              className="flex flex-col gap-2 items-start overflow-hidden"
              style={{ flex: category.percentage, minWidth: category.percentage > 5 ? '68px' : '40px' }}
            >
              <div className="flex flex-col gap-1 min-w-0 w-full">
                <span className="body-text text-[var(--text-secondary)] truncate text-[11.5px] block">
                  {category.label}
                </span>
                <span className="text-[16px] font-semibold text-[var(--text-primary)]">
                  {category.percentage}%
                </span>
              </div>
              <div 
                className="w-full h-[5px] rounded"
                style={{ backgroundColor: category.color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col">
        {/* Category Tabs */}
        <div className="flex gap-4 border-b border-[var(--border-default)]">
          {TRAFFIC_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-1 py-3 border-b-[1.5px] transition-colors ${
                activeCategory === category.id 
                  ? 'border-[var(--text-primary)]' 
                  : 'border-transparent'
              }`}
            >
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className={`body-text ${
                activeCategory === category.id 
                  ? 'text-[var(--text-primary)]' 
                  : 'text-[var(--text-secondary)]'
              }`}>
                {category.label}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="flex flex-col">
          {/* Header Row */}
          <div className="flex items-center border-b border-[var(--border-default)]">
            <div className="flex-1 px-4 py-3 flex items-center">
              <span className="body-text-bold text-[var(--text-secondary)]">
                {activeConfig?.label} referrers
              </span>
              <ChevronSmallDownIcon size={16} className="text-[var(--text-secondary)] ml-1" />
            </div>
            <div className="w-[128px] px-4 py-3 flex items-center">
              <span className="body-text-bold text-[var(--text-secondary)]">Category</span>
              <ChevronSmallDownIcon size={16} className="text-[var(--text-secondary)] ml-1" />
            </div>
            <button 
              onClick={() => handleSort('sessions')}
              className="w-[128px] px-4 py-3 flex items-center"
            >
              <span className={`body-text-bold ${sortColumn === 'sessions' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                {metricLabel}
              </span>
              <ChevronSmallDownIcon size={16} className={sortColumn === 'sessions' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'} />
            </button>
            <button 
              onClick={() => handleSort('conversions')}
              className="w-[128px] px-4 py-3 flex items-center"
            >
              <span className={`body-text-bold ${sortColumn === 'conversions' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                Conversions
              </span>
              <ChevronSmallDownIcon size={16} className={sortColumn === 'conversions' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'} />
            </button>
            <button 
              onClick={() => handleSort('conversionRate')}
              className="w-[128px] px-4 py-3 flex items-center justify-end"
            >
              <span className={`body-text-bold ${sortColumn === 'conversionRate' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                Conversion %
              </span>
              <ChevronSmallDownIcon size={16} className={sortColumn === 'conversionRate' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'} />
            </button>
          </div>

          {/* Total Row */}
          <div className="flex items-center border-b border-[var(--border-default)] bg-[var(--bg-secondary)]">
            <div className="flex-1 px-2 py-3">
              <span className="body-text-bold text-[var(--text-secondary)]">Total referrers</span>
            </div>
            <div className="w-[128px] px-4 py-3">
              <span className="body-text-bold text-[var(--text-secondary)]">Category</span>
            </div>
            <div className="w-[128px] px-4 py-3">
              <span className="body-text-bold text-[var(--text-secondary)]">{totalMetric.toLocaleString()}</span>
            </div>
            <div className="w-[128px] px-4 py-3">
              <span className="body-text-bold text-[var(--text-secondary)]">{totalConversions.toLocaleString()}</span>
            </div>
            <div className="w-[128px] px-4 py-3 text-right">
              <span className="body-text-bold text-[var(--text-secondary)]">{avgConversionRate.toFixed(1)}%</span>
            </div>
          </div>

          {/* Data Rows */}
          {sortedReferrers.length > 0 ? (
            sortedReferrers.map((referrer) => (
              <div key={referrer.id} className="flex items-center border-b border-[var(--border-default)]">
                <div className="flex-1 px-2 py-3 flex items-center gap-2">
                  {/* Favicon placeholder */}
                  <div className="w-4 h-4 rounded bg-[var(--bg-tertiary)] flex items-center justify-center text-[8px] text-[var(--text-secondary)]">
                    {referrer.name.charAt(0)}
                  </div>
                  <span className="body-text text-[var(--text-primary)]">{referrer.name}</span>
                  {referrer.tags?.map((tag) => (
                    <span 
                      key={tag}
                      className="px-1 py-0.5 rounded text-[11.5px] bg-[rgba(37,157,77,0.25)] text-[#79e09c]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="w-[128px] px-4 py-3">
                  <span className="body-text text-[var(--text-primary)]">{referrer.category}</span>
                </div>
                <div className="w-[128px] px-4 py-3">
                  <span className="body-text text-[var(--text-primary)]">{getMetricValue(referrer).toLocaleString()}</span>
                </div>
                <div className="w-[128px] px-4 py-3">
                  <span className="body-text text-[var(--text-primary)]">{referrer.conversions.toLocaleString()}</span>
                </div>
                <div className="w-[128px] px-4 py-3 text-right">
                  <span className="body-text text-[var(--text-primary)]">{referrer.conversionRate}%</span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-8">
              <span className="body-text text-[var(--text-secondary)]">No data available for this category</span>
            </div>
          )}
        </div>

        {/* Footer */}
        {sortedReferrers.length > 0 && (
          <div className="flex items-center justify-between pt-3">
            <Button variant="ghost" size="compact" className="text-[var(--text-secondary)]">
              See all {activeConfig?.label.toLowerCase()} referrers →
            </Button>
            <span className="body-text text-[var(--text-secondary)]">
              Showing {sortedReferrers.length} of {sortedReferrers.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrafficSourcesTableSection;
