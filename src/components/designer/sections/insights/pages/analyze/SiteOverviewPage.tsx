"use client";

import React, { useState } from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { useInsightsNavigation } from '@/context/InsightsNavigationContext';
import { Button } from '@/components/spring-ui/button';
import { GoalsConversionWidget } from '@/components/insights/GoalsConversionWidget';
import { TimeSeriesComponent } from '@/components/insights/TimeSeriesComponent';
import { HighlightCardComponent } from '@/components/insights/HighlightCardComponent';
import { TopPageComponent } from '@/components/insights/TopPageComponent';
import { TopEventComponent } from '@/components/insights/TopEventComponent';
import { TopNComponent } from '@/components/insights/TopNComponent';
import { ChevronSmallDownIcon } from '@/icons';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/spring-ui/dropdown-menu';
import { TabBar, TabBarItem } from '@/components/spring-ui/tab-bar';
import { Sparkline } from '@/components/insights/Sparkline';
import { DonutChart } from '@/components/insights/DonutChart';
import { TimeSeriesChart } from '@/components/insights/TimeSeriesChart';
import { TopCitedPagesWidget } from '@/components/insights/TopCitedPagesWidget';

export default function SiteOverviewPage() {
  const { version } = useInsightsVersion();
  const { navigateToSection } = useInsightsNavigation();
  const [metricType, setMetricType] = useState<string>('sessions');

  // Sparkline data patterns
  // 3 going up (green): flat up, steep jump up, gradual ups and downs up
  const sparklineUpFlat = [10, 11, 10.5, 11.5, 12, 11.8, 12.2, 12.5, 12.3, 12.8]; // Flat gradual increase
  const sparklineUpSteep = [10, 10.5, 11, 12, 14, 16, 18, 20, 22, 24]; // Steep jump up
  const sparklineUpGradual = [10, 12, 11, 13, 12, 14, 13, 15, 14, 16]; // Gradual ups and downs, overall up
  
  // 3 going down (red): flat down, steep drop down, gradual ups and downs down
  const sparklineDownFlat = [24, 23, 23.5, 22.5, 22, 22.2, 21.8, 21.5, 21.7, 21]; // Flat gradual decrease
  const sparklineDownSteep = [24, 23, 22, 20, 18, 16, 14, 12, 10, 8]; // Steep drop down
  const sparklineDownGradual = [24, 22, 23, 21, 22, 20, 21, 19, 20, 18]; // Gradual ups and downs, overall down

  return (
    <div className="flex-1 bg-[var(--bg-primary)] flex flex-col min-h-0">
      {/* Header */}
      {/* Header + Tab bar - fixed at top, don't scroll */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-between px-2 h-10 border-b border-[var(--border-default)]">
          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="title-text-bold text-[var(--text-primary)] truncate">
              Site overview
            </h2>
          </div>
          
          <div className="flex items-center gap-1 flex-shrink-0">
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
          <div className="flex flex-col gap-3">
          {metricType === 'bots' ? (
            /* AI discovery tab */
            <>
              {/* Topic performance - two sections horizontally */}
              <div className="flex flex-col gap-3">
                <h2 className="body-text-bold text-[var(--text-secondary)]">Topic performance</h2>
                <div className="flex gap-3 min-w-0">
                  {/* Left: Topic visibility chart */}
                  <div className="flex-1 min-w-0 bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg p-4 flex flex-col">
                    <div className="flex items-center gap-1 mb-3">
                      <p className="body-text-bold text-[var(--text-primary)]">Topic visibility</p>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-[24px] font-normal text-[var(--text-primary)] leading-[34px]">56%</span>
                      <span className="text-[11px] text-[var(--text-green)]">+3.4%</span>
                    </div>
                    <div className="flex-1 min-h-[220px]">
                      <TimeSeriesChart
                        data={[
                          { date: '3/13', value: 48 },
                          { date: '3/14', value: 50 },
                          { date: '3/15', value: 49 },
                          { date: '3/16', value: 54 },
                          { date: '3/17', value: 56 },
                        ]}
                        yDomain={[0, 100]}
                        height={220}
                        yAxisSuffix="%"
                      />
                    </div>
                  </div>
                  {/* Center: Top performing topics */}
                  <div className="flex-1 min-w-0 bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg p-4 flex flex-col">
                    <div className="flex items-center gap-1 mb-3">
                      <p className="body-text-bold text-[var(--text-primary)]">Top performing topics</p>
                    </div>
                    {/* Table */}
                    <div className="flex flex-col flex-1 min-h-0">
                      {/* Table header */}
                      <div className="flex items-center h-[40px] border-b border-[var(--border-default)]">
                        <div className="flex-1 pr-2 min-w-0">
                          <span className="body-text-bold text-[var(--text-secondary)]">Topics</span>
                        </div>
                        <div className="w-[80px] px-2 flex items-center shrink-0">
                          <span className="body-text-bold text-[var(--text-secondary)]">Visibility score</span>
                        </div>
                      </div>
                      {/* Table rows */}
                      {[
                        { topic: 'How to add custom CSS to my website', visibilityScore: 94, visibilityDelta: 8 },
                        { topic: 'Responsive design breakpoints setup', visibilityScore: 87, visibilityDelta: -3 },
                        { topic: 'E-commerce checkout optimization', visibilityScore: 91, visibilityDelta: 12 },
                        { topic: 'SEO meta tags configuration', visibilityScore: 72, visibilityDelta: -7 },
                        { topic: 'Form submission and validation', visibilityScore: 79, visibilityDelta: 4 },
                      ].map((row) => (
                        <div key={row.topic} className="flex items-center min-h-[40px] border-b border-[var(--border-default)]">
                          <div className="flex-1 pr-3 min-w-0">
                            <span className="body-text text-[var(--text-primary)] truncate block">{row.topic}</span>
                          </div>
                          <div className="w-[80px] px-3 flex items-center gap-1 shrink-0">
                            <span className="body-text text-[var(--text-secondary)]">{row.visibilityScore}%</span>
                            <span className={`text-[11px] ${row.visibilityDelta >= 0 ? 'text-[var(--text-green)]' : 'text-[var(--text-red)]'}`}>
                              {row.visibilityDelta >= 0 ? '+' : ''}{row.visibilityDelta}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-3 pt-3">
                      <Button variant="outline" size="compact" onClick={() => navigateToSection("topics-list")}>
                        Show all
                      </Button>
                    </div>
                  </div>
                  {/* Right: Top cited pages */}
                  <div className="flex-1 min-w-0">
                    <TopCitedPagesWidget className="h-full" />
                  </div>
                </div>
              </div>
              {/* Human visitor sources + Bot performance - side by side */}
              <div className="flex gap-3 items-stretch pt-3">
                {/* Human visitor sources - left (75% width) */}
                <div className="w-[75%] shrink-0 flex flex-col gap-3 min-w-0 min-h-[344px]">
                  <h2 className="body-text-bold text-[var(--text-secondary)]">Human visitors by sources</h2>
                  <div className="flex-1 min-h-0 bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg p-4 flex flex-col">
                    <div className="flex items-center gap-1 mb-3">
                      <p className="body-text text-[var(--text-secondary)]">Total visitors</p>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-[24px] font-normal text-[var(--text-primary)] leading-[34px]">310</span>
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

                {/* Bot performance - right (1/3 width) */}
                <div className="flex-[1] flex flex-col gap-3 min-w-0 min-h-[344px]">
                  <h2 className="body-text-bold text-[var(--text-secondary)]">Bot performance</h2>
                  <div className="flex-1 min-h-0 bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg p-4 flex flex-col">
                    <div className="mb-3">
                      <p className="body-text text-[var(--text-secondary)]">Total bot traffic</p>
                      <p className="text-[24px] font-normal text-[var(--text-primary)] leading-[34px]">3,687</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-4 flex-1 min-h-0">
                      <DonutChart
                        data={[
                          { label: 'Open AI', value: 1106, color: '#a855f7' },
                          { label: 'Google', value: 737, color: '#22d3ee' },
                          { label: 'Anthropic', value: 663, color: '#ec4899' },
                          { label: 'Meta', value: 553, color: '#f97316' },
                          { label: 'Other', value: 626, color: '#9ca3af' },
                        ]}
                        size={160}
                        innerRadiusRatio={0.45}
                      />
                      {/* Legend below chart, stacked vertically */}
                      <div className="flex flex-col gap-3 w-full">
                        {[
                          { label: 'Open AI', count: 1106, percent: 30, color: '#a855f7' },
                          { label: 'Google', count: 737, percent: 20, color: '#22d3ee' },
                          { label: 'Anthropic', count: 663, percent: 18, color: '#ec4899' },
                          { label: 'Meta', count: 553, percent: 15, color: '#f97316' },
                          { label: 'Other', count: 626, percent: 17, color: '#9ca3af' },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-2 w-full">
                            <div
                              className="w-2.5 h-2.5 rounded-[2px] shrink-0"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="body-text text-[var(--text-secondary)] shrink-0">{item.label}</span>
                            <div className="flex items-center gap-2 ml-auto shrink-0">
                              <span className="body-text text-[var(--text-primary)]">{item.count.toLocaleString()}</span>
                              <span className="body-text text-[var(--text-secondary)]">{item.percent}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
          <>
          {/* Top Row: Goals Conversion, Time Series, Highlight Cards */}
          <div className="grid grid-cols-12 gap-3">
            {/* Combined Group: Goals, Performance, Highlights - spans 12 columns */}
            <div className="col-span-12 grid grid-cols-12 gap-[12px] h-[410px]">
              {/* Goals Group - 2 columns */}
              <div className="col-span-2 flex flex-col gap-3">
                <h2 className="body-text-bold text-[var(--text-secondary)]">Goals</h2>
                <div className="flex-1 min-h-0">
                  <GoalsConversionWidget className="h-full" />
                </div>
              </div>
              
              {/* Performance Group - 8 columns */}
              <div className="col-span-8 flex flex-col gap-3">
                <h2 className="body-text-bold text-[var(--text-secondary)]">Performance</h2>
                <div className="flex-1 min-h-0">
                  <TimeSeriesComponent 
                    className="h-full" 
                    defaultTab="total-sessions"
                  />
                </div>
              </div>
              
              {/* Highlights Group - 2 columns */}
              <div className="col-span-2 flex flex-col gap-3">
                <h2 className="body-text-bold text-[var(--text-secondary)]">Highlights</h2>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex-1">
                    <HighlightCardComponent 
                      variant="graph" 
                      sparklineData={sparklineUpFlat}
                      sparklineColor="green"
                    />
                  </div>
                  <div className="flex-1">
                    <HighlightCardComponent variant="page" />
                  </div>
                  <div className="flex-1">
                    <HighlightCardComponent variant="basic" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Pages Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="body-text-bold text-[var(--text-secondary)]">Top pages</h2>
              <Button variant="outline" size="compact" onClick={() => navigateToSection("pages-list")}>
                See all pages
              </Button>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <TopPageComponent 
                  variant="Static" 
                  className="h-[91px]"
                  sparklineData={sparklineUpSteep}
                  sparklineColor="green"
                />
              </div>
              <div className="flex-1">
                <TopPageComponent 
                  variant="Static" 
                  className="h-[91px]"
                  sparklineData={sparklineDownSteep}
                  sparklineColor="red"
                />
              </div>
              <div className="flex-1">
                <TopPageComponent 
                  variant="CMS" 
                  className="h-[91px]"
                  sparklineData={sparklineUpGradual}
                  sparklineColor="green"
                />
              </div>
              <div className="flex-1">
                <TopPageComponent 
                  variant="Static" 
                  className="h-[91px]"
                  sparklineData={sparklineDownGradual}
                  sparklineColor="red"
                />
              </div>
              <div className="flex-1">
                <TopPageComponent 
                  variant="CMS" 
                  className="h-[91px]"
                  sparklineData={sparklineDownFlat}
                  sparklineColor="red"
                />
              </div>
            </div>
          </div>

          {/* Top Events Section */}
          {metricType !== 'bots' && (
            <div className="flex flex-col gap-3">
              <h2 className="body-text-bold text-[var(--text-secondary)]">Top events</h2>
              <div className="flex gap-3">
                <div className="flex-1">
                  <TopEventComponent 
                    variant="link (Page: cms)" 
                    className="h-[91px]"
                    sparklineData={sparklineUpFlat}
                    sparklineColor="green"
                  />
                </div>
                <div className="flex-1">
                  <TopEventComponent 
                    variant="button (Page: static)" 
                    className="h-[91px]"
                    sparklineData={sparklineDownSteep}
                    sparklineColor="red"
                  />
                </div>
                <div className="flex-1">
                  <TopEventComponent 
                    variant="link (Page: cms)" 
                    className="h-[91px]"
                    sparklineData={sparklineUpGradual}
                    sparklineColor="green"
                  />
                </div>
                <div className="flex-1">
                  <TopEventComponent 
                    variant="button (Page: static)" 
                    className="h-[91px]"
                    sparklineData={sparklineDownFlat}
                    sparklineColor="red"
                  />
                </div>
                <div className="flex-1">
                  <TopEventComponent 
                    variant="button (Page: cms)" 
                    className="h-[91px]"
                    sparklineData={sparklineDownGradual}
                    sparklineColor="red"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Audiences Section */}
          {metricType !== 'bots' && (
            <div className="flex flex-col gap-3">
              <h2 className="body-text-bold text-[var(--text-secondary)]">Audiences</h2>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-4">
                  <TopNComponent 
                    variant="audience" 
                    className="h-[274px]" 
                    viewType="sessions"
                  />
                </div>
                <div className="col-span-4">
                  <TopNComponent 
                    variant="technology" 
                    className="h-[274px]" 
                    viewType="sessions"
                  />
                </div>
                <div className="col-span-4">
                  <TopNComponent 
                    variant="traffic-sources" 
                    className="h-[274px]" 
                    viewType="sessions"
                  />
                </div>
              </div>
            </div>
          )}

          </>
          )}

          </div>
        </div>
      </div>
    </div>
  );
}

