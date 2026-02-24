"use client";

import React from 'react';
import { Table, TableHeader, TableRow, type ColumnDef } from '@/components/spring-ui/table';
import { Input } from '@/components/spring-ui/input';
import { Button } from '@/components/spring-ui/button';
import { InsightsGoal } from './InsightsGoalsListPanel';
import { getGoalIcon } from '@/data/goals';
import { CheckboxIcon, CsvExportIcon, CsvImportIcon, FilterIcon, SettingsIcon } from '@/icons';

interface GoalsTableProps {
  goals: InsightsGoal[];
  selectedGoal: InsightsGoal | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onGoalSelect: (goal: InsightsGoal) => void;
}

export default function GoalsTable({
  goals,
  selectedGoal,
  searchQuery,
  onSearchChange,
  onGoalSelect
}: GoalsTableProps) {
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
      renderCell: (value, rowData: InsightsGoal) => {
        const GoalIcon = getGoalIcon(rowData);
        return (
          <div className="flex items-center gap-2 min-w-0">
            <GoalIcon size={16} style={{ color: 'var(--text-secondary)' }} />
            <span className="body-text text-[var(--text-primary)] truncate">
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
      renderCell: (value, rowData: InsightsGoal) => (
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
            Goals
          </h2>
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          <Input
            placeholder="Search goals..."
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
          {goals.map((goal) => (
            <TableRow
              key={goal.id}
              data={goal}
              columns={columns}
              onClick={() => onGoalSelect(goal)}
              className={`
                cursor-pointer transition-colors duration-200
                ${selectedGoal?.id === goal.id ? 'bg-[var(--bg-raised)]' : 'hover:bg-[var(--bg-raised)]'}
              `}
            />
          ))}
        </Table>
        
        {goals.length === 0 && (
          <div className="flex items-center justify-center py-12 text-[var(--text-secondary)]">
            {searchQuery ? 'No goals match your search' : 'No goals'}
          </div>
        )}
      </div>
    </div>
  );
}

