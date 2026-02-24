"use client";

import React from 'react';
import { Table, TableHeader, TableRow, type ColumnDef } from '@/components/spring-ui/table';
import { Input } from '@/components/spring-ui/input';
import { Button } from '@/components/spring-ui/button';
import { InsightsPage } from './InsightsPagesListPanel';
import { PageDefaultIcon } from '@/icons';
import { CheckboxIcon, CsvExportIcon, CsvImportIcon, FilterIcon, SettingsIcon } from '@/icons';

interface PagesTableProps {
  pages: InsightsPage[];
  selectedPage: InsightsPage | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPageSelect: (page: InsightsPage) => void;
}

export default function PagesTable({
  pages,
  selectedPage,
  searchQuery,
  onSearchChange,
  onPageSelect
}: PagesTableProps) {
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const columns: ColumnDef[] = [
    { 
      id: 'name', 
      header: 'Name', 
      width: '50%',
      renderCell: (value, rowData: InsightsPage) => {
        const isCMS = rowData.variant === 'CMS';
        const iconColor = isCMS ? 'var(--text-purple)' : 'var(--text-secondary)';
        const textColor = isCMS ? 'text-[var(--text-purple)]' : 'text-[var(--text-primary)]';
        
        return (
          <div className="flex items-center gap-2 min-w-0">
            <PageDefaultIcon size={16} style={{ color: iconColor }} />
            <span className={`body-text truncate ${textColor}`}>
              {rowData.name}
            </span>
          </div>
        );
      }
    },
    { 
      id: 'modifiedDate', 
      header: 'Modified', 
      width: '50%',
      renderCell: (value, rowData: InsightsPage) => (
        <span className="text-[var(--text-secondary)]">
          {formatDate(rowData.modifiedDate)}
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
            Pages
          </h2>
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          <Input
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-64"
          />
          <Button size="compact" variant="outline">
            <FilterIcon />
            Filter
          </Button>
          <Button size="compact" variant="outline">
            <CheckboxIcon />
            Select
          </Button>
          <Button size="compact" variant="outline">
            <CsvExportIcon />
            Export
          </Button>
          <Button size="compact" variant="outline">
            <CsvImportIcon />
            Import
          </Button>
          <Button size="compact" variant="outline">
            <SettingsIcon />
            Settings
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto w-full">
        <Table noBorder>
          <TableHeader columns={columns} />
          {pages.map((page) => (
            <TableRow
              key={page.id}
              data={page}
              columns={columns}
              onClick={() => onPageSelect(page)}
              className={`
                cursor-pointer transition-colors duration-200
                ${selectedPage?.id === page.id ? 'bg-[var(--bg-raised)]' : 'hover:bg-[var(--bg-raised)]'}
              `}
            />
          ))}
        </Table>
        
        {pages.length === 0 && (
          <div className="flex items-center justify-center py-12 text-[var(--text-secondary)]">
            {searchQuery ? 'No pages match your search' : 'No pages'}
          </div>
        )}
      </div>
    </div>
  );
}

