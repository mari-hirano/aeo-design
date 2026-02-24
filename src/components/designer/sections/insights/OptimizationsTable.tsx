"use client";

import React from 'react';
import { Table, TableHeader, TableRow, type ColumnDef } from '@/components/spring-ui/table';
import { Input } from '@/components/spring-ui/input';
import { Button } from '@/components/spring-ui/button';
import { InsightsOptimization } from './InsightsOptimizationsListPanel';
import {
  StatusLiveIcon,
  StatusReadyIcon,
  StatusPausedIcon,
  StatusDraftIcon,
  PageDefaultIcon,
  ElementComponentIcon,
  ElementButtonIcon,
  ArchiveIcon,
} from '@/icons';

interface OptimizationsTableProps {
  optimizations: InsightsOptimization[];
  selectedOptimization: InsightsOptimization | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOptimizationSelect: (optimization: InsightsOptimization) => void;
}

export default function OptimizationsTable({
  optimizations,
  selectedOptimization,
  searchQuery,
  onSearchChange,
  onOptimizationSelect
}: OptimizationsTableProps) {
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <StatusLiveIcon size={16} style={{ color: '#79E09C' }} />;
      case 'ready':
        return <StatusReadyIcon size={16} style={{ color: '#A7D1FF' }} />;
      case 'paused':
        return <StatusPausedIcon size={16} className="text-[var(--text-secondary)]" />;
      case 'draft':
        return <StatusDraftIcon size={16} style={{ color: '#FFBC86' }} />;
      case 'archived':
        return <ArchiveIcon size={16} className="text-[var(--text-secondary)]" />;
      default:
        return null;
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'live':
        return { color: '#79E09C' };
      case 'ready':
        return { color: '#A7D1FF' };
      case 'draft':
        return { color: '#FFBC86' };
      case 'paused':
      case 'archived':
        return 'secondary';
      default:
        return undefined;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'live':
        return 'Live';
      case 'ready':
        return 'Ready';
      case 'paused':
        return 'Paused';
      case 'draft':
        return 'Draft';
      case 'archived':
        return 'Archived';
      default:
        return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'personalization':
        return 'Personalization';
      case 'test':
        return 'Test';
      case 'ai-optimize':
        return 'AI optimize';
      default:
        return type;
    }
  };

  const getChangesIcon = (changes: string) => {
    if (changes === 'No changes') {
      return null;
    }
    // Simple heuristic: if it mentions pages, use PageDefaultIcon
    // If it mentions components/sections, use ElementComponentIcon
    // If it mentions buttons, use ElementButtonIcon
    if (changes.toLowerCase().includes('page')) {
      return <PageDefaultIcon size={16} className="text-[var(--text-secondary)]" />;
    }
    if (changes.toLowerCase().includes('component') || changes.toLowerCase().includes('section')) {
      return <ElementComponentIcon size={16} className="text-[var(--text-secondary)]" />;
    }
    if (changes.toLowerCase().includes('button')) {
      return <ElementButtonIcon size={16} className="text-[var(--text-secondary)]" />;
    }
    return <PageDefaultIcon size={16} className="text-[var(--text-secondary)]" />;
  };

  const columns: ColumnDef[] = [
    { 
      id: 'name', 
      header: 'Name',
      sortable: true,
      width: '25%',
      renderCell: (value, rowData: InsightsOptimization) => (
        <span className="body-text text-[var(--text-primary)] truncate">
          {rowData.name}
        </span>
      )
    },
    { 
      id: 'type', 
      header: 'Type',
      width: '15%',
      renderCell: (value, rowData: InsightsOptimization) => (
        <span className="body-text text-[var(--text-primary)]">
          {getTypeLabel(rowData.type)}
        </span>
      )
    },
    { 
      id: 'primaryGoal', 
      header: 'Primary Goal',
      width: '20%',
      renderCell: (value, rowData: InsightsOptimization) => (
        <span className="body-text text-[var(--text-primary)] truncate">
          {rowData.primaryGoal}
        </span>
      )
    },
    { 
      id: 'changes', 
      header: 'Changes',
      width: '20%',
      renderCell: (value, rowData: InsightsOptimization) => (
        <div className="flex items-center gap-1.5 min-w-0">
          {getChangesIcon(rowData.changes)}
          <span className="body-text text-[var(--text-primary)] truncate">
            {rowData.changes}
          </span>
        </div>
      )
    },
    { 
      id: 'status', 
      header: 'Status',
      width: '10%',
      renderCell: (value, rowData: InsightsOptimization) => {
        const textColor = getStatusTextColor(rowData.status);
        const isSecondary = textColor === 'secondary';
        return (
          <div className="flex items-center gap-1.5">
            {getStatusIcon(rowData.status)}
            <span 
              className={isSecondary ? "body-text text-[var(--text-secondary)]" : textColor ? "body-text" : "body-text text-[var(--text-primary)]"}
              style={typeof textColor === 'object' && textColor ? textColor : undefined}
            >
              {getStatusLabel(rowData.status)}
            </span>
          </div>
        );
      }
    },
    { 
      id: 'lastUpdated', 
      header: 'Last updated',
      width: '10%',
      renderCell: (value, rowData: InsightsOptimization) => (
        <span className="body-text text-[var(--text-secondary)]">
          {formatDateTime(rowData.lastUpdated)}
        </span>
      )
    }
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="flex items-center justify-between px-2 h-10 border-b border-[var(--border-default)]">
        <div className="flex flex-col min-w-0 flex-1">
          <h2 className="title-text-bold text-[var(--text-primary)] truncate">
            Optimizations
          </h2>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            showSearchIcon
            className="w-48"
          />
          <Button variant="primary" size="compact">
            New optimization
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto w-full">
        <Table noBorder>
          <TableHeader columns={columns} />
          {optimizations.map((optimization) => (
            <TableRow
              key={optimization.id}
              data={optimization}
              columns={columns}
              onClick={() => onOptimizationSelect(optimization)}
              className={`
                cursor-pointer transition-colors duration-200
                ${selectedOptimization?.id === optimization.id ? 'bg-[var(--bg-raised)]' : 'hover:bg-[var(--bg-raised)]'}
              `}
            />
          ))}
        </Table>
        
        {optimizations.length === 0 && (
          <div className="flex items-center justify-center py-12 text-[var(--text-secondary)]">
            {searchQuery ? 'No optimizations match your search' : 'No optimizations'}
          </div>
        )}
      </div>
    </div>
  );
}

