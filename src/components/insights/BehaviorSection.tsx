"use client";

import React from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { ElementLinkIcon, ElementButtonIcon, PageDefaultIcon, DownloadIcon } from '@/icons';
import { Button } from '@/components/spring-ui/button';

// Types for the behavior data
interface EventItem {
  id: string;
  name: string;
  sessions: number;
  type: 'link' | 'button' | 'download';
}

interface PageItem {
  id: string;
  name: string;
  sessions: number;
  isCMS?: boolean;
}

// Mock data for Top Events
const mockTopEvents: EventItem[] = [
  { id: '1', name: 'Pricing Nav', sessions: 3022, type: 'link' },
  { id: '2', name: 'Expert hero', sessions: 876, type: 'download' },
  { id: '3', name: 'Download the app', sessions: 532, type: 'download' },
  { id: '4', name: 'Blog Nav', sessions: 244, type: 'link' },
  { id: '5', name: 'View tokens', sessions: 33, type: 'link' },
];

// Mock data for Previous Page
const mockPreviousPages: PageItem[] = [
  { id: '1', name: 'Blog', sessions: 3022 },
  { id: '2', name: 'Home', sessions: 876 },
  { id: '3', name: 'What Loyalty Can L...', sessions: 532, isCMS: true },
  { id: '4', name: 'SMB Solutions', sessions: 244 },
  { id: '5', name: 'How Fast Is Fast E...', sessions: 33, isCMS: true },
];

// Mock data for Next Page
const mockNextPages: PageItem[] = [
  { id: '1', name: 'Talk to an expert', sessions: 3022 },
  { id: '2', name: 'Your Analytics Stac...', sessions: 876 },
  { id: '3', name: 'How to Create and...', sessions: 532, isCMS: true },
  { id: '4', name: 'Customizing Your...', sessions: 244, isCMS: true },
  { id: '5', name: 'Enterprise Solutions', sessions: 33 },
];

// Get icon for event type
function getEventIcon(type: 'link' | 'button' | 'download') {
  switch (type) {
    case 'link':
      return ElementLinkIcon;
    case 'download':
      return DownloadIcon;
    case 'button':
    default:
      return ElementButtonIcon;
  }
}

// Bar component for proportional display
function SessionBar({ value, maxValue }: { value: number; maxValue: number }) {
  const percentage = Math.max((value / maxValue) * 100, 1); // Minimum 1% width for visibility
  
  return (
    <div className="flex-1 flex items-center">
      <div 
        className="h-[6px] bg-[var(--blue-bg)] rounded-sm"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

// Individual row for events
function EventRow({ event, maxSessions }: { event: EventItem; maxSessions: number }) {
  const Icon = getEventIcon(event.type);
  
  return (
    <div className="flex items-center gap-2 py-1.5">
      <Icon size={16} className="text-[var(--text-secondary)] shrink-0" />
      <span className="body-text text-[var(--text-primary)] w-[120px] truncate">
        {event.name}
      </span>
      <SessionBar value={event.sessions} maxValue={maxSessions} />
      <span className="body-text text-[var(--text-secondary)] w-[50px] text-right tabular-nums">
        {event.sessions.toLocaleString()}
      </span>
    </div>
  );
}

// Individual row for pages
function PageRow({ page, maxSessions }: { page: PageItem; maxSessions: number }) {
  const iconColor = page.isCMS ? 'var(--text-purple)' : 'var(--text-secondary)';
  
  return (
    <div className="flex items-center gap-2 py-1.5">
      <PageDefaultIcon size={16} style={{ color: iconColor }} className="shrink-0" />
      <span className="body-text text-[var(--text-primary)] w-[120px] truncate">
        {page.name}
      </span>
      <SessionBar value={page.sessions} maxValue={maxSessions} />
      <span className="body-text text-[var(--text-secondary)] w-[50px] text-right tabular-nums">
        {page.sessions.toLocaleString()}
      </span>
    </div>
  );
}

// Card component wrapper
interface BehaviorCardProps {
  title: string;
  children: React.ReactNode;
  onShowAll?: () => void;
  metricLabel?: string;
}

function BehaviorCard({ title, children, onShowAll, metricLabel = 'Sessions' }: BehaviorCardProps) {
  return (
    <div className="bg-[var(--bg-raised)] border border-[var(--border-default)] rounded-lg p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="body-text-bold text-[var(--text-primary)]">{title}</span>
        <span className="body-text text-[var(--text-secondary)]">{metricLabel}</span>
      </div>
      
      {/* Content */}
      <div className="flex-1">
        {children}
      </div>
      
      {/* Show all button */}
      <div className="flex justify-center mt-3 pt-2">
        <Button 
          variant="default" 
          size="compact"
          onClick={onShowAll}
        >
          Show all
        </Button>
      </div>
    </div>
  );
}

// Alternative mock data for Visitors view
const mockTopEventsVisitors: EventItem[] = [
  { id: '1', name: 'Pricing Nav', sessions: 1856, type: 'link' },
  { id: '2', name: 'Expert hero', sessions: 542, type: 'download' },
  { id: '3', name: 'Download the app', sessions: 328, type: 'download' },
  { id: '4', name: 'Blog Nav', sessions: 156, type: 'link' },
  { id: '5', name: 'View tokens', sessions: 21, type: 'link' },
];

const mockPreviousPagesVisitors: PageItem[] = [
  { id: '1', name: 'Blog', sessions: 1856 },
  { id: '2', name: 'Home', sessions: 542 },
  { id: '3', name: 'What Loyalty Can L...', sessions: 328, isCMS: true },
  { id: '4', name: 'SMB Solutions', sessions: 156 },
  { id: '5', name: 'How Fast Is Fast E...', sessions: 21, isCMS: true },
];

const mockNextPagesVisitors: PageItem[] = [
  { id: '1', name: 'Talk to an expert', sessions: 1856 },
  { id: '2', name: 'Your Analytics Stac...', sessions: 542 },
  { id: '3', name: 'How to Create and...', sessions: 328, isCMS: true },
  { id: '4', name: 'Customizing Your...', sessions: 156, isCMS: true },
  { id: '5', name: 'Enterprise Solutions', sessions: 21 },
];

// Main Behavior Section component
interface BehaviorSectionProps {
  topEvents?: EventItem[];
  previousPages?: PageItem[];
  nextPages?: PageItem[];
  viewType?: 'sessions' | 'visitors';
}

export function BehaviorSection({ 
  topEvents,
  previousPages,
  nextPages,
  viewType = 'sessions'
}: BehaviorSectionProps) {
  const { version } = useInsightsVersion();
  
  // Select data based on viewType
  const effectiveTopEvents = topEvents ?? (viewType === 'visitors' ? mockTopEventsVisitors : mockTopEvents);
  const effectivePreviousPages = previousPages ?? (viewType === 'visitors' ? mockPreviousPagesVisitors : mockPreviousPages);
  const effectiveNextPages = nextPages ?? (viewType === 'visitors' ? mockNextPagesVisitors : mockNextPages);
  
  // Calculate max sessions for proportional bars
  const maxEventSessions = Math.max(...effectiveTopEvents.map(e => e.sessions));
  const maxPreviousSessions = Math.max(...effectivePreviousPages.map(p => p.sessions));
  const maxNextSessions = Math.max(...effectiveNextPages.map(p => p.sessions));
  
  // Determine metric label based on view type
  const metricLabel = viewType === 'visitors' ? 'Visitors' : 'Sessions';
  
  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Top Events Card */}
      <BehaviorCard title="Top events" metricLabel={metricLabel}>
        {effectiveTopEvents.map(event => (
          <EventRow 
            key={event.id} 
            event={event} 
            maxSessions={maxEventSessions} 
          />
        ))}
      </BehaviorCard>
      
      {/* Previous Page Card */}
      <BehaviorCard title="Previous page" metricLabel={metricLabel}>
        {effectivePreviousPages.map(page => (
          <PageRow 
            key={page.id} 
            page={page} 
            maxSessions={maxPreviousSessions} 
          />
        ))}
      </BehaviorCard>
      
      {/* Next Page Card */}
      <BehaviorCard title="Next page" metricLabel={metricLabel}>
        {effectiveNextPages.map(page => (
          <PageRow 
            key={page.id} 
            page={page} 
            maxSessions={maxNextSessions} 
          />
        ))}
      </BehaviorCard>
    </div>
  );
}
