"use client";

import React, { useState, useEffect } from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import InsightsPagesListPanel, { InsightsPage } from '@/components/designer/sections/insights/InsightsPagesListPanel';
import { BlankComponentCard } from '@/components/insights/BlankComponentCard';
import { TotalViewsSection } from '@/components/insights/TotalViewsSection';
import { BehaviorSection } from '@/components/insights/BehaviorSection';
import { TrafficSourcesTableSection } from '@/components/insights/TrafficSourcesTableSection';
import { Button } from '@/components/spring-ui/button';
import { ChevronSmallDownIcon } from '@/icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/spring-ui/dropdown-menu';
import { TabBar, TabBarItem } from '@/components/spring-ui/tab-bar';
import { DonutChart } from '@/components/insights/DonutChart';
import { TimeSeriesChart } from '@/components/insights/TimeSeriesChart';

// Mock pages data
const mockPages: InsightsPage[] = [
  { id: '1', name: 'Home', path: '/', variant: 'Static', modifiedDate: '2024-01-15' },
  { id: '2', name: 'Contact Us', path: '/contact', variant: 'Static', modifiedDate: '2024-01-10' },
  { id: '3', name: 'About', path: '/about', variant: 'Static', modifiedDate: '2024-01-08' },
  { id: '4', name: 'Blog', path: '/blog', variant: 'CMS', modifiedDate: '2024-01-12' },
  { id: '5', name: 'Services', path: '/services', variant: 'CMS', modifiedDate: '2024-01-14' },
];

interface PagesDetailPageProps {
  selectedPageId?: string | null;
}

export default function PagesDetailPage({ selectedPageId }: PagesDetailPageProps) {
  const { version } = useInsightsVersion();
  const [selectedPage, setSelectedPage] = useState<InsightsPage | null>(
    selectedPageId ? (mockPages.find(p => p.id === selectedPageId) || null) : mockPages[0] || null
  );
  const [metricType, setMetricType] = useState<string>('sessions');

  // Sync selected page when selectedPageId prop changes
  useEffect(() => {
    if (selectedPageId) {
      const page = mockPages.find(p => p.id === selectedPageId);
      if (page) {
        setSelectedPage(page);
      }
    }
  }, [selectedPageId]);

  const handlePageSelect = (page: InsightsPage) => {
    setSelectedPage(page);
  };

  return (
    <div className="flex h-full bg-[var(--bg-primary)]">
      {/* Left Navigation Panel */}
      <InsightsPagesListPanel
        pages={mockPages}
        selectedPage={selectedPage}
        onPageSelect={handlePageSelect}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Right Detail Content */}
        <div className="flex-1 bg-[var(--bg-primary)] flex flex-col min-h-0">
          {selectedPage ? (
            <>
              {/* Header + Tab bar - fixed at top, don't scroll */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-default)] bg-[var(--bg-primary)]">
                  <h2 className="title-text-bold text-[var(--text-primary)] line-clamp-1 flex-1 min-w-0 pr-4">
                    {selectedPage.name}
                  </h2>
                  
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="comfortable" variant="default" className="h-6">
                          Last 7 days
                          <ChevronSmallDownIcon size={16} className="ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                        <DropdownMenuItem>Last 14 days</DropdownMenuItem>
                        <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                        <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Metric Type Tab Bar - edge-to-edge border */}
                <div className="border-b border-[var(--border-default)] bg-[var(--bg-primary)]">
                  <TabBar value={metricType} onValueChange={setMetricType} className="px-2">
                    <TabBarItem value="sessions">Visitor behavior</TabBarItem>
                    <TabBarItem value="bots">AI discovery</TabBarItem>
                  </TabBar>
                </div>
              </div>

              <div className="p-4 overflow-y-auto flex-1 min-h-0">
                <div className="w-full mx-auto">
                  <div className="flex flex-col gap-6">
                    {metricType === 'bots' ? (
                      /* AI discovery tab - three sections stacked vertically */
                      <>
                        {/* Section 1: Topic performance - two subsections side by side */}
                        <div className="flex flex-col gap-3">
                          <h2 className="body-text-bold text-[var(--text-secondary)]">Topic performance</h2>
                          <div className="flex gap-3">
                            {/* Left: Top cited topics for this page */}
                            <div className="flex-1 min-w-0 flex flex-col gap-3 p-4 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[8px]">
                              <h3 className="body-text-bold text-[var(--text-primary)]">Top cited topics for this page</h3>
                              <div className="flex items-center gap-4 flex-1 min-h-0">
                                <DonutChart
                                  data={[
                                    { label: 'No-code website builder', value: 30, color: '#a855f7' },
                                    { label: 'Portfolio website', value: 20, color: '#22d3ee' },
                                    { label: 'Drag and drop editors', value: 18, color: '#ec4899' },
                                    { label: 'Responsive web', value: 15, color: '#f97316' },
                                    { label: 'Other', value: 17, color: '#9ca3af' },
                                  ]}
                                  size={120}
                                  innerRadiusRatio={0.45}
                                />
                                <div className="flex flex-col gap-2 flex-1 min-w-0">
                                  {[
                                    { label: 'No-code website builder', percent: 30, color: '#a855f7' },
                                    { label: 'Portfolio website', percent: 20, color: '#22d3ee' },
                                    { label: 'Drag and drop editors', percent: 18, color: '#ec4899' },
                                    { label: 'Responsive web', percent: 15, color: '#f97316' },
                                    { label: 'Other', percent: 17, color: '#9ca3af' },
                                  ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-2">
                                      <div
                                        className="w-2.5 h-2.5 rounded-[2px] shrink-0"
                                        style={{ backgroundColor: item.color }}
                                      />
                                      <span className="body-text text-[var(--text-primary)] shrink-0 truncate">{item.label}</span>
                                      <span className="body-text text-[var(--text-secondary)] ml-auto shrink-0">{item.percent}%</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            {/* Right: Citation rank for all topics compared to other pages */}
                            <div className="flex-1 min-w-0 flex flex-col gap-3 p-4 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[8px]">
                              <h3 className="body-text-bold text-[var(--text-primary)]">Citation rank for all topics compared to other pages</h3>
                              <div className="flex flex-col gap-3">
                                {[
                                  { rank: 1, name: 'Home', percent: 32, isCurrentPage: false },
                                  { rank: 2, name: 'Pricing', percent: 18, isCurrentPage: false },
                                  { rank: 3, name: 'Contact', percent: 14, isCurrentPage: false },
                                  { rank: 4, name: 'Talk to an Expert', percent: 12, isCurrentPage: false },
                                  { rank: 5, name: 'This page', percent: 10, isCurrentPage: true },
                                ].map((item) => (
                                  <div key={item.rank} className="grid grid-cols-[auto_150px_minmax(0,1fr)] items-center gap-3 min-w-0 overflow-hidden">
                                    <span className="body-text text-[var(--text-secondary)] shrink-0">{item.rank}.</span>
                                    <span className={`${item.isCurrentPage ? 'body-text-bold' : 'body-text'} ${item.isCurrentPage ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'} truncate min-w-0`}>
                                      {item.name}
                                    </span>
                                    <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
                                      <div className="flex-1 min-w-0 flex items-center">
                                        <div
                                          className={`h-2 rounded-full shrink-0 ${!item.isCurrentPage ? 'opacity-50' : ''}`}
                                          style={{
                                            width: `${(item.percent / 32) * 100}%`,
                                            backgroundColor: item.isCurrentPage ? 'var(--blue-chart)' : 'var(--gray-500)',
                                          }}
                                        />
                                      </div>
                                      <span className={`body-text shrink-0 whitespace-nowrap ${item.isCurrentPage ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                                        {item.percent}%
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Section 3: Human visitor sources - same visuals as SiteOverviewPage */}
                        <div className="flex flex-col gap-3">
                          <h2 className="body-text-bold text-[var(--text-secondary)]">Human visitors</h2>
                          <div className="flex-1 min-h-0 bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg p-4 flex flex-col">
                            <div className="flex items-center gap-1 mb-3">
                              <p className="body-text text-[var(--text-secondary)]">Total visitors</p>
                            </div>
                            <div className="flex items-baseline gap-2 mb-3">
                              <span className="text-[24px] font-normal text-[var(--text-primary)] leading-[34px]">80</span>
                              <span className="text-[11px] text-[var(--text-green)]">+12%</span>
                            </div>
                            <div className="flex-1 min-h-0">
                              <TimeSeriesChart
                                multiLineData={[
                                  {
                                    id: 'ai-referred',
                                    label: 'AI-referred',
                                    color: '#22d3ee',
                                    strokeWidth: 2,
                                    data: [
                                      { date: '3/13', value: 18 },
                                      { date: '3/14', value: 15 },
                                      { date: '3/15', value: 24 },
                                      { date: '3/16', value: 18 },
                                      { date: '3/17', value: 28 },
                                    ],
                                  },
                                  {
                                    id: 'organic',
                                    label: 'Organic',
                                    color: '#ffd301',
                                    strokeDasharray: '4 4',
                                    data: [
                                      { date: '3/13', value: 22 },
                                      { date: '3/14', value: 20 },
                                      { date: '3/15', value: 35 },
                                      { date: '3/16', value: 32 },
                                      { date: '3/17', value: 38 },
                                    ],
                                  },
                                  {
                                    id: 'direct',
                                    label: 'Direct',
                                    color: '#da6d95',
                                    strokeDasharray: '4 4',
                                    data: [
                                      { date: '3/13', value: 25 },
                                      { date: '3/14', value: 23 },
                                      { date: '3/15', value: 38 },
                                      { date: '3/16', value: 36 },
                                      { date: '3/17', value: 42 },
                                    ],
                                  },
                                  {
                                    id: 'everything-else',
                                    label: 'Everything else',
                                    color: 'var(--text-secondary)',
                                    strokeDasharray: '4 4',
                                    data: [
                                      { date: '3/13', value: 12 },
                                      { date: '3/14', value: 8 },
                                      { date: '3/15', value: 10 },
                                      { date: '3/16', value: 6 },
                                      { date: '3/17', value: 13 },
                                    ],
                                  },
                                ]}
                                showLegend={true}
                                curve="linear"
                                yDomain={[0, 50]}
                                height={280}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Section 4: Bot traffic */}
                        <div className="flex flex-col gap-3">
                          <h2 className="body-text-bold text-[var(--text-secondary)]">Bot traffic</h2>
                          <div className="flex flex-col gap-3 min-h-0 bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[8px] p-4">
                            <div>
                              <p className="body-text text-[var(--text-secondary)]">Total bots</p>
                              <p className="text-[24px] font-normal leading-[34px] text-[var(--text-primary)]">178</p>
                            </div>
                            <TimeSeriesChart
                              multiLineData={[
                                {
                                  id: 'open-ai',
                                  label: 'Open AI',
                                  color: '#FFD301',
                                  data: [
                                    { date: '3/13', value: 42 },
                                    { date: '3/14', value: 40 },
                                    { date: '3/15', value: 46 },
                                    { date: '3/16', value: 48 },
                                    { date: '3/17', value: 50 },
                                  ],
                                },
                                {
                                  id: 'anthropic',
                                  label: 'Anthropic',
                                  color: '#DF640C',
                                  data: [
                                    { date: '3/13', value: 25 },
                                    { date: '3/14', value: 40 },
                                    { date: '3/15', value: 26 },
                                    { date: '3/16', value: 38 },
                                    { date: '3/17', value: 47 },
                                  ],
                                },
                                {
                                  id: 'google',
                                  label: 'Google',
                                  color: '#007DF0',
                                  data: [
                                    { date: '3/13', value: 12 },
                                    { date: '3/14', value: 32 },
                                    { date: '3/15', value: 37 },
                                    { date: '3/16', value: 32 },
                                    { date: '3/17', value: 37 },
                                  ],
                                },
                                {
                                  id: 'meta',
                                  label: 'Meta',
                                  color: '#259D4D',
                                  data: [
                                    { date: '3/13', value: 22 },
                                    { date: '3/14', value: 18 },
                                    { date: '3/15', value: 35 },
                                    { date: '3/16', value: 23 },
                                    { date: '3/17', value: 25 },
                                  ],
                                },
                                {
                                  id: 'other',
                                  label: 'Other',
                                  color: '#A6A6A6',
                                  data: [
                                    { date: '3/13', value: 20 },
                                    { date: '3/14', value: 18 },
                                    { date: '3/15', value: 22 },
                                    { date: '3/16', value: 20 },
                                    { date: '3/17', value: 24 },
                                  ],
                                },
                              ]}
                              showLegend={true}
                              curve="linear"
                              yDomain={[0, 50]}
                              height={200}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Performance Section */}
                        <div className="flex flex-col gap-3">
                          <h2 className="body-text-bold text-[var(--text-secondary)]">Performance</h2>
                          <TotalViewsSection viewType="sessions" />
                        </div>

                        {/* Behavior Section */}
                        <div className="flex flex-col gap-3">
                          <h2 className="body-text-bold text-[var(--text-secondary)]">Behavior</h2>
                          <BehaviorSection viewType="sessions" />
                        </div>

                        {/* Traffic sources Section */}
                        <TrafficSourcesTableSection viewType="sessions" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Default state when no page is selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="body-text text-[var(--text-secondary)]">
                  Select a page from the list to view its analytics
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

