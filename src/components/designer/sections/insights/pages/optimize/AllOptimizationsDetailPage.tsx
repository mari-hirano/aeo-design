"use client";

import React, { useState, useEffect } from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { Button } from '@/components/spring-ui/button';
import { IconButton } from '@/components/spring-ui/iconButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/spring-ui/select';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/spring-ui/dropdown-menu';
import {
  ArrowLeftIcon,
  TargetIcon,
  MoreIcon,
  UserIcon,
  DisplayGridIcon,
  DownloadIcon,
  ArrowDownIcon,
  ChevronSmallDownIcon,
  AISparkleIcon,
  InfoIcon,
  EditIcon,
  AddIcon,
  CloseDefaultIcon,
  GlobeCheckIcon,
  PageDefaultIcon,
  StatusLiveIcon,
  Column3Icon,
} from '@/icons';
import { Input } from '@/components/spring-ui/input';
import { Badge } from '@/components/spring-ui/badge';
import { Table, TableHeader, TableRow } from '@/components/spring-ui/table';
import { TabBar, TabBarItem } from '@/components/spring-ui/tab-bar';
import { Textarea } from '@/components/spring-ui/textarea';
import { Link } from '@/components/spring-ui/link';
import { VariationPerformanceChart } from '@/components/insights/VariationPerformanceChart';
import { TrafficAllocationChart } from '@/components/insights/TrafficAllocationChart';
import { OPTIMIZATIONS_LIST } from '@/data/optimizations';
import { useInsightsNavigation } from '@/context/InsightsNavigationContext';

interface AllOptimizationsDetailPageProps {
  selectedOptimizationId?: string | null;
}

export default function AllOptimizationsDetailPage({ selectedOptimizationId }: AllOptimizationsDetailPageProps) {
  const { version } = useInsightsVersion();
  const { navigateToSection } = useInsightsNavigation();
  const [statusSelect, setStatusSelect] = useState('status');
  const [aiQuery, setAiQuery] = useState('');
  const [notes, setNotes] = useState('');
  const [audienceTab, setAudienceTab] = useState('traffic-source');
  const [accountEngagementTab, setAccountEngagementTab] = useState('accounts');
  const [accountSearchQuery, setAccountSearchQuery] = useState('');
  const [variationMetric, setVariationMetric] = useState('conversion-rate');
  const [variationTimePeriod, setVariationTimePeriod] = useState('weekly');
  const [trafficAllocationTimePeriod, setTrafficAllocationTimePeriod] = useState('weekly');

  // Find the selected optimization
  const selectedOptimization = OPTIMIZATIONS_LIST.find(opt => opt.id === selectedOptimizationId) || OPTIMIZATIONS_LIST[0];

  // Sync when selectedOptimizationId changes
  useEffect(() => {
    if (selectedOptimizationId) {
      const opt = OPTIMIZATIONS_LIST.find(o => o.id === selectedOptimizationId);
      if (opt) {
        // Optimization found, content will display
      }
    }
  }, [selectedOptimizationId]);

  const getTypeIcon = () => {
    switch (selectedOptimization?.type) {
      case 'personalization':
        return 'Personalization';
      case 'test':
        return 'Test';
      case 'ai-optimize':
        return 'AI optimize';
      default:
        return 'AI optimize';
    }
  };

  return (
    <div className="flex-1 h-full bg-[var(--bg-primary)] flex flex-col overflow-hidden">
      {/* Control Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-default)]">
        {/* Left side - Back button */}
        <div 
          className="flex items-center gap-2 text-[var(--text-primary)] body-text cursor-pointer hover:opacity-80"
          onClick={() => navigateToSection("all-optimizations-list")}
        >
          <ArrowLeftIcon size={16} className="text-[var(--text-secondary)]" />
          <span>All optimizations</span>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-2">
          {/* Date Range Picker */}
          <Select defaultValue="sep-4-17-2024">
            <SelectTrigger variant="button" className="h-8 px-3 whitespace-nowrap shrink-0 w-auto min-w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sep-4-17-2024">Sep 4 - 17, 2024</SelectItem>
              <SelectItem value="aug-28-sep-10-2024">Aug 28 - Sep 10, 2024</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>

          {/* Goal Selector */}
          <Select defaultValue="on-page-engagement">
            <SelectTrigger variant="button" className="h-8 px-3 max-w-[140px]">
              <div className="flex items-center gap-1.5 min-w-0 w-full overflow-hidden">
                <TargetIcon size={16} className="text-[var(--text-secondary)] shrink-0" />
                <span className="truncate whitespace-nowrap min-w-0">
                  <SelectValue />
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on-page-engagement">On-page engagement</SelectItem>
              <SelectItem value="conversion-rate">Conversion rate</SelectItem>
              <SelectItem value="page-views">Page views</SelectItem>
            </SelectContent>
          </Select>

          {/* Filters Button */}
          <Select defaultValue="filters">
            <SelectTrigger variant="button" className="h-8 px-3">
              <SelectValue placeholder="Filters (2)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="filters">Filters (2)</SelectItem>
              <SelectItem value="filter-1">Filter 1</SelectItem>
              <SelectItem value="filter-2">Filter 2</SelectItem>
            </SelectContent>
          </Select>

          {/* More Menu */}
          <IconButton variant="ghost" size="comfortable" className="h-8 w-8">
            <MoreIcon size={16} className="text-[var(--text-secondary)]" />
          </IconButton>

          {/* Stop Optimization Button */}
          <Button variant="primary" size="comfortable" className="h-8 px-3">
            Stop Optimization
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-auto bg-[var(--bg-primary)]">
        <div className="pl-6 pt-6 pb-6 pr-6 bg-[var(--bg-primary)]">
          <div className="flex flex-col gap-2">
            {/* Main Heading */}
            <h1 className="title-text-bold text-[var(--text-primary)]">
              {selectedOptimization?.name || 'Homepage Headline Value Prop'}
            </h1>
            
            {/* Status Line */}
            <div className="flex items-center gap-2">
              <UserIcon size={16} className="text-[var(--text-primary)]" />
              <span className="body-text text-[var(--text-primary)]">{getTypeIcon()}</span>
              <div className="h-3 w-px bg-[var(--border-default)] mx-1" />
              {selectedOptimization?.status === 'live' && (
                <>
                  <StatusLiveIcon size={16} style={{ color: '#79E09C' }} />
                  <span className="body-text text-[var(--text-green)] ml-1">Live</span>
                </>
              )}
              {selectedOptimization?.status === 'ready' && (
                <>
                  <StatusLiveIcon size={16} style={{ color: '#007DF0' }} />
                  <span className="body-text text-[var(--text-blue)] ml-1">Ready</span>
                </>
              )}
              {selectedOptimization?.status === 'paused' && (
                <>
                  <StatusLiveIcon size={16} className="text-[var(--text-secondary)]" />
                  <span className="body-text text-[var(--text-secondary)] ml-1">Paused</span>
                </>
              )}
              {selectedOptimization?.status === 'draft' && (
                <>
                  <StatusLiveIcon size={16} className="text-[var(--text-secondary)]" />
                  <span className="body-text text-[var(--text-secondary)] ml-1">Draft</span>
                </>
              )}
            </div>
          </div>

          {/* Two Column Container */}
          <div className="flex gap-8">
            <div className="flex-1">
              {/* Vertical flex container */}
              <div className="flex flex-col gap-8">
                {/* Variations Section */}
                <div className="flex flex-col gap-3 mt-7">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="title-text-bold text-[var(--text-primary)]">Variations</h2>
                    <div className="flex items-center gap-2">
                      <Input 
                        showSearchIcon 
                        placeholder="Search" 
                        className="w-[200px]"
                      />
                      <IconButton variant="ghost" size="comfortable" className="h-8 w-8">
                        <DisplayGridIcon size={16} className="text-[var(--text-secondary)]" />
                      </IconButton>
                      <IconButton variant="ghost" size="comfortable" className="h-8 w-8">
                        <DownloadIcon size={16} className="text-[var(--text-secondary)]" />
                      </IconButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="comfortable" className="h-8 px-3">
                            {statusSelect === 'status' ? 'Status' : statusSelect === 'active' ? 'Active' : 'Paused'}
                            <ChevronSmallDownIcon size={16} className="ml-1 opacity-70" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setStatusSelect('status')}>
                            Status
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setStatusSelect('active')}>
                            Active
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setStatusSelect('paused')}>
                            Paused
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Table */}
                  <Table noBorder className="[&>div>div:first-child>div]:bg-transparent [&>div>div:first-child>div_span]:body-text [&>div>div:first-child>div_span]:text-[var(--text-secondary)] [&>div>div:first-child>div_span]:font-normal">
                    <TableHeader
                      columns={[
                        { id: 'name', header: 'Name' },
                        { id: 'strength', header: 'Strength' },
                        { id: 'conversionRate', header: 'Conversion rate' },
                        { id: 'conversions', header: 'Conversions' },
                        { id: 'sessions', header: 'Sessions' },
                      ]}
                    />
                    <TableRow
                      columns={[
                        { id: 'name', header: 'Name' },
                        { id: 'strength', header: 'Strength' },
                        { id: 'conversionRate', header: 'Conversion rate' },
                        { id: 'conversions', header: 'Conversions' },
                        { id: 'sessions', header: 'Sessions' },
                      ]}
                      data={{
                        name: (
                          <div className="flex items-center gap-2">
                            <StatusLiveIcon size={16} style={{ color: '#79E09C' }} />
                            <span className="body-text text-[var(--text-primary)]">Subheadline color change</span>
                          </div>
                        ),
                        strength: <span className="body-text text-[var(--text-primary)]">35%</span>,
                        conversionRate: (
                          <div className="flex items-center gap-2">
                            <span className="body-text text-[var(--text-primary)]">11.08%</span>
                            <Badge 
                              variant="orange" 
                              size="compact" 
                              shape="square" 
                              styleType="tinted" 
                              style={{ backgroundColor: 'var(--orange-400-a20)' }}
                            >
                              -3%
                            </Badge>
                          </div>
                        ),
                        conversions: <span className="body-text text-[var(--text-primary)]">301</span>,
                        sessions: <span className="body-text text-[var(--text-primary)]">2,716</span>,
                      }}
                    />
                    <TableRow
                      columns={[
                        { id: 'name', header: 'Name' },
                        { id: 'strength', header: 'Strength' },
                        { id: 'conversionRate', header: 'Conversion rate' },
                        { id: 'conversions', header: 'Conversions' },
                        { id: 'sessions', header: 'Sessions' },
                      ]}
                      data={{
                        name: (
                          <div className="flex items-center gap-2">
                            <StatusLiveIcon size={16} style={{ color: '#79E09C' }} />
                            <span className="body-text text-[var(--text-primary)]">Component main change</span>
                          </div>
                        ),
                        strength: <span className="body-text text-[var(--text-primary)]">80%</span>,
                        conversionRate: (
                          <div className="flex items-center gap-2">
                            <span className="body-text text-[var(--text-primary)]">9.31%</span>
                            <Badge 
                              variant="green" 
                              size="compact" 
                              shape="square" 
                              styleType="tinted" 
                              style={{ backgroundColor: 'var(--green-400-a20)' }}
                            >
                              +1%
                            </Badge>
                          </div>
                        ),
                        conversions: <span className="body-text text-[var(--text-primary)]">148</span>,
                        sessions: <span className="body-text text-[var(--text-primary)]">1,337</span>,
                      }}
                    />
                    <TableRow
                      columns={[
                        { id: 'name', header: 'Name' },
                        { id: 'strength', header: 'Strength' },
                        { id: 'conversionRate', header: 'Conversion rate' },
                        { id: 'conversions', header: 'Conversions' },
                        { id: 'sessions', header: 'Sessions' },
                      ]}
                      data={{
                        name: (
                          <div className="flex items-center gap-2">
                            <StatusLiveIcon size={16} style={{ color: '#79E09C' }} />
                            <span className="body-text text-[var(--text-primary)]">Base (no change)</span>
                          </div>
                        ),
                        strength: <span className="body-text text-[var(--text-primary)]">32%</span>,
                        conversionRate: (
                          <div className="flex items-center gap-2">
                            <span className="body-text text-[var(--text-primary)]">10.61%</span>
                            <Badge 
                              variant="green" 
                              size="compact" 
                              shape="square" 
                              styleType="tinted" 
                              style={{ backgroundColor: 'var(--green-400-a20)' }}
                            >
                              +1%
                            </Badge>
                          </div>
                        ),
                        conversions: <span className="body-text text-[var(--text-primary)]">119</span>,
                        sessions: <span className="body-text text-[var(--text-primary)]">1,122</span>,
                      }}
                    />
                    <TableRow
                      columns={[
                        { id: 'name', header: 'Name' },
                        { id: 'strength', header: 'Strength' },
                        { id: 'conversionRate', header: 'Conversion rate' },
                        { id: 'conversions', header: 'Conversions' },
                        { id: 'sessions', header: 'Sessions' },
                      ]}
                      data={{
                        name: (
                          <div className="flex items-center gap-2">
                            <StatusLiveIcon size={16} style={{ color: '#79E09C' }} />
                            <span className="body-text text-[var(--text-primary)]">Subheadline font change</span>
                          </div>
                        ),
                        strength: <span className="body-text text-[var(--text-secondary)]">—</span>,
                        conversionRate: (
                          <div className="flex items-center gap-2">
                            <span className="body-text text-[var(--text-primary)]">9.25%</span>
                            <Badge variant="default" size="compact" shape="square" styleType="solid">
                              —
                            </Badge>
                          </div>
                        ),
                        conversions: <span className="body-text text-[var(--text-primary)]">96</span>,
                        sessions: <span className="body-text text-[var(--text-primary)]">1,038</span>,
                      }}
                    />
                  </Table>
                </div>

                {/* Audience Insights Section */}
                <div className="flex flex-col gap-4">
                  {/* Header */}
                  <h2 className="title-text-bold text-[var(--text-primary)]">Audience insights</h2>

                  {/* Tabs */}
                  <TabBar value={audienceTab} onValueChange={setAudienceTab}>
                    <TabBarItem value="traffic-source">
                      <div className="flex items-center gap-1">
                        <span>Traffic Source</span>
                      </div>
                    </TabBarItem>
                    <TabBarItem value="device-type">
                      <div className="flex items-center gap-1">
                        <span>Device Type</span>
                      </div>
                    </TabBarItem>
                    <TabBarItem value="new-returning">
                      <div className="flex items-center gap-1">
                        <span>New/Returning Visitor</span>
                      </div>
                    </TabBarItem>
                    <TabBarItem value="others">
                      <div className="flex items-center gap-1">
                        <span>Others (17)</span>
                        <ChevronSmallDownIcon size={16} className="text-[var(--text-secondary)]" />
                      </div>
                    </TabBarItem>
                  </TabBar>

                  {/* Table Content */}
                  <div className="flex flex-col gap-2">
                    {/* Column Headers Row */}
                    <div className="flex gap-1">
                      {/* Empty space for row labels */}
                      <div className="w-[80px]" />
                      {/* Column Headers */}
                      {['Paid Search', 'Paid Social', 'Direct Nav', 'Organic Search', 'Other', 'Other Paid', 'Organic Social'].map((header, idx) => (
                        <div key={idx} className="flex-1 flex items-center justify-start">
                          <span className="body-text text-[var(--text-secondary)] font-normal">{header}</span>
                        </div>
                      ))}
                    </div>

                    {/* Table Grid */}
                    <div className="flex flex-col gap-1">
                      {/* Row Data */}
                      {[
                        { label: 'Base', values: [8.04, 15.84, 17.26, 7.67, 17.94, 7.45, 2.67] },
                        { label: 'Variation 1', values: [8.24, 6.65, 11.74, 13.84, 1.81, 13.04, 1.76] },
                        { label: 'Variation 2', values: [2.22, 15.45, 14.28, 14.72, 5.03, null, 14.83] },
                        { label: 'Long variation name', values: [1.04, 13.04, 11.45, 13.34, null, null, 1.09] },
                      ].map((row, rowIdx) => {
                        const truncatedLabel = row.label.length > 11 
                          ? row.label.substring(0, 11) + '...' 
                          : row.label;
                        return (
                          <div key={rowIdx} className="flex gap-1">
                            {/* Row Label */}
                            <div className="w-[80px] flex items-center px-1 py-2">
                              <span className="body-text text-[var(--text-primary)] font-normal" title={row.label}>
                                {truncatedLabel}
                              </span>
                            </div>
                          {/* Data Cells */}
                          <div className="flex-1 flex gap-1">
                            {row.values.map((value, colIdx) => {
                              const getCellStyle = (val: number | null) => {
                                if (val === null) {
                                  return {
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-dimmed)',
                                  };
                                }
                                let opacity = 0.1;
                                if (val > 14.1) {
                                  opacity = 0.47;
                                } else if (val > 7) {
                                  opacity = 0.25;
                                }
                                return {
                                  backgroundColor: `rgba(0, 125, 240, ${opacity})`,
                                  color: 'var(--text-primary)',
                                };
                              };

                              const cellStyle = getCellStyle(value);
                              return (
                                <div
                                  key={colIdx}
                                  className="flex-1 flex items-center justify-center px-6 py-4 rounded-[2px]"
                                  style={cellStyle}
                                >
                                  <span className="body-text font-semibold" style={{ color: cellStyle.color }}>
                                    {value === null ? '--' : `${value.toFixed(2)}%`}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                      })}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[var(--border-default)] my-2" />

                    {/* Legend */}
                    <div className="flex gap-1 items-start">
                      <div className="flex flex-col gap-1 w-[80px]">
                        <div className="h-4 bg-[rgba(0,125,240,0.1)] rounded-[2px]" />
                        <span className="body-text text-[var(--text-secondary)] font-normal">0%</span>
                      </div>
                      <div className="flex flex-col gap-1 w-[80px]">
                        <div className="h-4 bg-[rgba(0,125,240,0.25)] rounded-[2px]" />
                        <span className="body-text text-[var(--text-secondary)] font-normal">7%</span>
                      </div>
                      <div className="flex flex-col gap-1 w-[80px]">
                        <div className="h-4 bg-[rgba(0,125,240,0.47)] rounded-[2px]" />
                        <span className="body-text text-[var(--text-secondary)] font-normal">14-21%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Engagement Section */}
                <div className="flex flex-col gap-3">
                  {/* Header */}
                  <h2 className="title-text-bold text-[var(--text-primary)]">Account engagement</h2>

                  {/* Tabs */}
                  <TabBar value={accountEngagementTab} onValueChange={setAccountEngagementTab}>
                    <TabBarItem value="accounts">
                      <span>Accounts</span>
                    </TabBarItem>
                    <TabBarItem value="contacts">
                      <span>Contacts</span>
                    </TabBarItem>
                  </TabBar>

                  {/* Search and Filter */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Input 
                        showSearchIcon 
                        placeholder="Search" 
                        value={accountSearchQuery}
                        onChange={(e) => setAccountSearchQuery(e.target.value)}
                        className="flex-1"
                      />
                      <IconButton variant="ghost" size="comfortable" className="h-8 w-8">
                        <Column3Icon size={16} className="text-[var(--text-secondary)]" />
                      </IconButton>
                    </div>
                    <p className="body-text text-[var(--text-secondary)]">
                      1000+ results
                    </p>
                  </div>

                  {/* Table */}
                  <Table noBorder className="[&>div>div:first-child>div]:bg-transparent [&>div>div:first-child>div_span]:body-text [&>div>div:first-child>div_span]:text-[var(--text-secondary)] [&>div>div:first-child>div_span]:font-normal">
                    <TableHeader
                      columns={[
                        { id: 'name', header: 'Name', sortable: true },
                        { id: 'latestSession', header: 'Latest Session' },
                        { id: 'sessions', header: 'Sessions' },
                        { id: 'percentOfTotal', header: '% of total' },
                        { id: 'conversions', header: 'Conversions' },
                      ]}
                      sortState={{ column: 'name', direction: 'desc' }}
                    />
                    {[
                      { name: 'Zillow Group, Inc.', latestSession: 'Aug 15', sessions: 568, percentOfTotal: '0.86%', conversions: 8 },
                      { name: 'Anderson Inc.', latestSession: 'Today', sessions: 2752, percentOfTotal: '5.38%', conversions: 49 },
                      { name: 'Fiserv', latestSession: 'Today', sessions: 2667, percentOfTotal: '4.09%', conversions: 134 },
                      { name: 'Mitel', latestSession: 'Yesterday', sessions: 1765, percentOfTotal: '1.79%', conversions: 32 },
                      { name: 'ScanPlus Inc.', latestSession: 'Yesterday', sessions: 696, percentOfTotal: '0.87%', conversions: 21 },
                      { name: 'Domo', latestSession: '3 days ago', sessions: 568, percentOfTotal: '0.86%', conversions: 8 },
                      { name: 'WebFX', latestSession: '7 days ago', sessions: 568, percentOfTotal: '0.86%', conversions: 8 },
                      { name: 'Trackforce Valiant', latestSession: 'Aug 15', sessions: 568, percentOfTotal: '0.86%', conversions: 8 },
                    ].map((row, index) => (
                      <TableRow
                        key={index}
                        columns={[
                          { id: 'name', header: 'Name' },
                          { id: 'latestSession', header: 'Latest Session' },
                          { id: 'sessions', header: 'Sessions' },
                          { id: 'percentOfTotal', header: '% of total' },
                          { id: 'conversions', header: 'Conversions' },
                        ]}
                        data={{
                          name: <span className="body-text text-[var(--text-primary)]">{row.name}</span>,
                          latestSession: <span className="body-text text-[var(--text-primary)]">{row.latestSession}</span>,
                          sessions: <span className="body-text text-[var(--text-primary)]">{row.sessions.toLocaleString()}</span>,
                          percentOfTotal: <span className="body-text text-[var(--text-primary)]">{row.percentOfTotal}</span>,
                          conversions: <span className="body-text text-[var(--text-primary)]">{row.conversions}</span>,
                        }}
                        zebraStripes={false}
                        className="border-b-0 h-[44px]"
                        style={index % 2 === 1 ? { backgroundColor: 'rgba(255, 255, 255, 0.03)' } : undefined}
                      />
                    ))}
                  </Table>
                </div>

                {/* Variation Performance Section */}
                <div className="flex flex-col gap-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="title-text-bold text-[var(--text-primary)]">Variation performance</h2>
                    <div className="flex items-center gap-2">
                      <Select value={variationMetric} onValueChange={setVariationMetric}>
                        <SelectTrigger 
                          variant="default" 
                          className="h-8 px-3 border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-raised)] shadow-none min-w-[140px]"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conversion-rate">Conversion rate</SelectItem>
                          <SelectItem value="conversions">Conversions</SelectItem>
                          <SelectItem value="sessions">Sessions</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={variationTimePeriod} onValueChange={setVariationTimePeriod}>
                        <SelectTrigger 
                          variant="default" 
                          className="h-8 px-3 border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-raised)] shadow-none"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="w-full h-[250px]">
                    <VariationPerformanceChart
                      xAxisDates={['4/30', '5/3', '5/7', '5/15', '5/23', '6/1', '6/9', '6/25', '7/2', '7/10', '7/18', '7/26', '8/4']}
                      lines={[
                        {
                          name: 'No Change',
                          data: [
                            { date: '4/30', value: 2.0 },
                            { date: '5/3', value: 2.1 },
                            { date: '5/7', value: 1.9 },
                            { date: '5/15', value: 2.2 },
                            { date: '5/23', value: 1.8 },
                            { date: '6/1', value: 2.0 },
                            { date: '6/9', value: 2.1 },
                            { date: '6/25', value: 1.9 },
                            { date: '7/2', value: 2.0 },
                            { date: '7/10', value: 2.1 },
                            { date: '7/18', value: 1.9 },
                            { date: '7/26', value: 2.0 },
                            { date: '8/4', value: 2.1 },
                          ],
                          color: 'var(--text-secondary)',
                          isDashed: true,
                        },
                        {
                          name: 'Variation 1',
                          data: [
                            { date: '4/30', value: 1.0 },
                            { date: '5/3', value: 1.5 },
                            { date: '5/7', value: 2.0 },
                            { date: '5/15', value: 2.5 },
                            { date: '5/23', value: 3.0 },
                            { date: '6/1', value: 3.5 },
                            { date: '6/9', value: 4.0 },
                            { date: '6/25', value: 4.5 },
                            { date: '7/2', value: 5.0 },
                            { date: '7/10', value: 5.5 },
                            { date: '7/18', value: 6.0 },
                            { date: '7/26', value: 6.5 },
                            { date: '8/4', value: 7.0 },
                          ],
                          color: 'var(--green-chart)',
                        },
                        {
                          name: 'Variation 2',
                          data: [
                            { date: '4/30', value: 8.5 },
                            { date: '5/3', value: 8.0 },
                            { date: '5/7', value: 7.5 },
                            { date: '5/15', value: 7.0 },
                            { date: '5/23', value: 6.5 },
                            { date: '6/1', value: 6.0 },
                            { date: '6/9', value: 5.5 },
                            { date: '6/25', value: 5.0 },
                            { date: '7/2', value: 4.5 },
                            { date: '7/10', value: 4.0 },
                            { date: '7/18', value: 3.5 },
                            { date: '7/26', value: 3.0 },
                            { date: '8/4', value: 2.5 },
                          ],
                          color: 'var(--yellow-chart)',
                        },
                        {
                          name: 'Variation 3',
                          data: [
                            { date: '4/30', value: 2.0 },
                            { date: '5/3', value: 4.0 },
                            { date: '5/7', value: 3.0 },
                            { date: '5/15', value: 5.5 },
                            { date: '5/23', value: 4.0 },
                            { date: '6/1', value: 6.5 },
                            { date: '6/9', value: 5.0 },
                            { date: '6/25', value: 7.5 },
                            { date: '7/2', value: 6.0 },
                            { date: '7/10', value: 8.0 },
                            { date: '7/18', value: 6.5 },
                            { date: '7/26', value: 7.0 },
                            { date: '8/4', value: 5.5 },
                          ],
                          color: 'var(--blue-chart)',
                        },
                        {
                          name: 'Variation 4',
                          data: [
                            { date: '4/30', value: 1.5 },
                            { date: '5/3', value: 2.2 },
                            { date: '5/7', value: 1.8 },
                            { date: '5/15', value: 3.0 },
                            { date: '5/23', value: 2.5 },
                            { date: '6/1', value: 3.8 },
                            { date: '6/9', value: 3.5 },
                            { date: '6/25', value: 4.0 },
                            { date: '7/2', value: 4.8 },
                            { date: '7/10', value: 5.0 },
                            { date: '7/18', value: 6.5 },
                            { date: '7/26', value: 6.0 },
                            { date: '8/4', value: 7.5 },
                          ],
                          color: 'var(--orange-chart)',
                        },
                      ]}
                      yDomain={[0, 10]}
                      height={250}
                    />
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 justify-end">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-0 border-t border-[var(--text-secondary)] border-dashed" style={{ borderWidth: '1.5px' }} />
                      <span className="body-text text-[var(--text-secondary)] text-[11.5px]">No Change</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[var(--green-chart)]" />
                      <span className="body-text text-[var(--text-secondary)] text-[11.5px]">Variation 1</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[var(--yellow-chart)]" />
                      <span className="body-text text-[var(--text-secondary)] text-[11.5px]">Variation 2</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[var(--blue-chart)]" />
                      <span className="body-text text-[var(--text-secondary)] text-[11.5px]">Variation 3</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[var(--orange-chart)]" />
                      <span className="body-text text-[var(--text-secondary)] text-[11.5px]">Variation 4</span>
                    </div>
                  </div>
                </div>

                {/* Traffic Allocation Section */}
                <div className="flex flex-col gap-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="title-text-bold text-[var(--text-primary)]">Traffic allocation</h2>
                    <div className="flex items-center gap-2">
                      <Select value={trafficAllocationTimePeriod} onValueChange={setTrafficAllocationTimePeriod}>
                        <SelectTrigger 
                          variant="default" 
                          className="h-8 px-3 border border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-raised)] shadow-none"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="w-full h-[279px]">
                    <TrafficAllocationChart
                      xAxisDates={['4/30', '5/3', '5/7', '5/15', '5/23', '6/1', '6/9', '6/25', '7/2', '7/10', '7/18', '7/26', '8/4']}
                      data={[
                        { date: '4/30', noChange: 32, variation1: 20, variation2: 25, variation3: 15, variation4: 8 },
                        { date: '5/3', noChange: 30, variation1: 22, variation2: 24, variation3: 16, variation4: 8 },
                        { date: '5/7', noChange: 28, variation1: 24, variation2: 23, variation3: 17, variation4: 8 },
                        { date: '5/15', noChange: 26, variation1: 26, variation2: 22, variation3: 18, variation4: 8 },
                        { date: '5/23', noChange: 24, variation1: 28, variation2: 21, variation3: 19, variation4: 8 },
                        { date: '6/1', noChange: 22, variation1: 30, variation2: 20, variation3: 20, variation4: 8 },
                        { date: '6/9', noChange: 20, variation1: 32, variation2: 19, variation3: 21, variation4: 8 },
                        { date: '6/25', noChange: 16, variation1: 36, variation2: 17, variation3: 23, variation4: 8 },
                        { date: '7/2', noChange: 14, variation1: 38, variation2: 16, variation3: 24, variation4: 8 },
                        { date: '7/10', noChange: 12, variation1: 40, variation2: 15, variation3: 25, variation4: 8 },
                        { date: '7/18', noChange: 10, variation1: 42, variation2: 14, variation3: 26, variation4: 8 },
                        { date: '7/26', noChange: 8, variation1: 44, variation2: 13, variation3: 27, variation4: 8 },
                        { date: '8/4', noChange: 6, variation1: 46, variation2: 12, variation3: 28, variation4: 8 },
                      ]}
                      series={[
                        {
                          name: 'No Change',
                          key: 'noChange',
                          color: 'var(--text-secondary)',
                        },
                        {
                          name: 'Variation 1',
                          key: 'variation1',
                          color: 'var(--green-chart)',
                        },
                        {
                          name: 'Variation 2',
                          key: 'variation2',
                          color: 'var(--yellow-chart)',
                        },
                        {
                          name: 'Variation 3',
                          key: 'variation3',
                          color: 'var(--blue-chart)',
                        },
                        {
                          name: 'Variation 4',
                          key: 'variation4',
                          color: 'var(--orange-chart)',
                        },
                      ]}
                      height={279}
                    />
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 justify-end">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-[var(--text-secondary)]" />
                      <span className="body-text text-[var(--text-secondary)] text-[11.5px]">No Change</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-[var(--green-chart)]" />
                      <span className="body-text text-[var(--text-secondary)] text-[11.5px]">Variation 1</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-[var(--yellow-chart)]" />
                      <span className="body-text text-[var(--text-secondary)] text-[11.5px]">Variation 2</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-[var(--blue-chart)]" />
                      <span className="body-text text-[var(--text-secondary)] text-[11.5px]">Variation 3</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-[var(--orange-chart)]" />
                      <span className="body-text text-[var(--text-secondary)] text-[11.5px]">Variation 4</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[330px] min-w-[330px]">
              {/* AI Insights Section */}
              <div className="flex flex-col bg-[#353535] rounded-[6px] p-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="title-text-bold text-[var(--text-primary)]">AI Insights</h2>
                    <Badge variant="default" size="compact" shape="rounded" styleType="tinted">
                      Beta
                    </Badge>
                  </div>
                  <IconButton variant="ghost" size="comfortable" className="h-8 w-8 rounded bg-[var(--purple-bg)] hover:bg-[var(--purple-bg-hover)]">
                    <AISparkleIcon size={16} className="text-white" />
                  </IconButton>
                </div>

                {/* Info Text */}
                <div className="flex flex-col items-start gap-2 mb-6 pt-[40px]">
                  <InfoIcon size={16} className="text-[var(--text-secondary)] shrink-0" />
                  <p className="body-text text-[var(--text-primary)]">
                    Get quick answers and deeper insights into your report. What would you like to know?
                  </p>
                </div>

                {/* Suggested Questions */}
                <div className="flex flex-col gap-2 mb-6">
                  <Button
                    variant="ghost"
                    size="comfortable"
                    className="w-full justify-start text-left h-auto py-2 px-3 bg-white/13 hover:bg-white/20"
                    onClick={() => setAiQuery("What's the main takeaway from the data?")}
                  >
                    <span className="body-text text-[var(--text-primary)]">
                      What's the main takeaway from the data?
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="comfortable"
                    className="w-full justify-start text-left h-auto py-2 px-3 bg-white/13 hover:bg-white/20"
                    onClick={() => setAiQuery("What's a recent trend in the data?")}
                  >
                    <span className="body-text text-[var(--text-primary)]">
                      What's a recent trend in the data?
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="comfortable"
                    className="w-full justify-start text-left h-auto py-2 px-3 bg-white/13 hover:bg-white/20"
                    onClick={() => setAiQuery("Tell me an insight about the audience.")}
                  >
                    <span className="body-text text-[var(--text-primary)]">
                      Tell me an insight about the audience.
                    </span>
                  </Button>
                </div>

                {/* Text Input */}
                <div className="flex-1 flex flex-col mb-4">
                  <Textarea
                    placeholder="Ask anything..."
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    className="flex-1 min-h-[120px]"
                  />
                </div>

                {/* Disclaimer */}
                <p className="body-text text-[var(--text-dimmed)] text-xs">
                  By using AI Insights, you are agreeing to Webflow's{' '}
                  <Link variant="default" href="#" className="underline text-[var(--text-dimmed)]">
                    product terms
                  </Link>
                </p>
              </div>

              {/* Test Setup Section */}
              <div className="flex flex-col rounded-[6px] border border-[var(--border-default)] p-[12px] mt-4">
                {/* Header */}
                <h2 className="title-text-bold text-[var(--text-secondary)] mb-4">Test setup</h2>

                {/* Audiences Section */}
                <div className="flex flex-col gap-3 pb-4 border-b border-[var(--border-default)]">
                  <div className="flex items-center justify-between">
                    <h3 className="title-text-bold text-[var(--text-primary)]">Audiences</h3>
                    <IconButton variant="ghost" size="comfortable" className="h-6 w-6">
                      <EditIcon size={16} className="text-[var(--text-secondary)]" />
                    </IconButton>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                      <UserIcon size={16} className="text-[var(--text-primary)]" />
                      <AddIcon size={14} className="text-[var(--text-primary)]" />
                      <span className="body-text text-[var(--text-primary)]">Include (1): Everybody</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <UserIcon size={16} className="text-[var(--text-primary)]" />
                      <CloseDefaultIcon size={14} className="text-[var(--text-primary)]" />
                      <span className="body-text text-[var(--text-primary)]">Exclude (1): New York</span>
                    </div>
                  </div>
                </div>

                {/* Goals Section */}
                <div className="flex flex-col gap-3 py-4 border-b border-[var(--border-default)]">
                  <div className="flex items-center justify-between">
                    <h3 className="title-text-bold text-[var(--text-primary)]">Goals</h3>
                    <IconButton variant="ghost" size="comfortable" className="h-6 w-6">
                      <EditIcon size={16} className="text-[var(--text-secondary)]" />
                    </IconButton>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <ArrowDownIcon size={16} className="text-[var(--text-primary)]" />
                      <span className="body-text text-[var(--text-primary)]">On page engagement</span>
                      <Badge variant="blue" size="compact" shape="square" styleType="solid">
                        Primary goal
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <GlobeCheckIcon size={16} className="text-[var(--text-primary)]" />
                      <span className="body-text text-[var(--text-primary)]">Shopify checkout completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GlobeCheckIcon size={16} className="text-[var(--text-primary)]" />
                      <span className="body-text text-[var(--text-primary)]">Hubspot form submitted</span>
                    </div>
                  </div>
                </div>

                {/* Pages Section */}
                <div className="flex flex-col gap-3 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="title-text-bold text-[var(--text-primary)]">Pages</h3>
                    <IconButton variant="ghost" size="comfortable" className="h-6 w-6">
                      <EditIcon size={16} className="text-[var(--text-secondary)]" />
                    </IconButton>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <PageDefaultIcon size={16} className="text-[var(--text-primary)]" />
                      <span className="body-text text-[var(--text-primary)]">Home</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PageDefaultIcon size={16} className="text-[var(--text-primary)]" />
                      <span className="body-text text-[var(--text-primary)]">Contacts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PageDefaultIcon size={16} className="text-[var(--text-purple)]" />
                      <span className="body-text text-[var(--text-purple)]">Articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PageDefaultIcon size={16} className="text-[var(--text-primary)]" />
                      <span className="body-text text-[var(--text-primary)]">Products</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PageDefaultIcon size={16} className="text-[var(--text-primary)]" />
                      <span className="body-text text-[var(--text-primary)]">Deepdive</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="flex flex-col rounded-[6px] border border-[var(--border-default)] p-3 mt-4">
                <h2 className="title-text-bold text-[var(--text-primary)] mb-3">Notes</h2>
                <Textarea
                  placeholder="Write down anything you would find valuable for yourself or your team, like your hypothesis or context around the experience."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[120px] resize-y"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
