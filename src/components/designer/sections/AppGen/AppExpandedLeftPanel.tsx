"use client";

import React from 'react';
import { IconButton } from '@/components/spring-ui/icon-button';
import { Row } from '@/components/spring-ui/row';
import { AddIcon } from '@/icons';

interface AppExpandedLeftPanelProps {
  onRowClick?: (rowLabel: string) => void;
}

export default function AppExpandedLeftPanel({ onRowClick }: AppExpandedLeftPanelProps) {
  return (
    <div className="bg-[var(--bg-primary)] w-[280px] h-full border-r border-[var(--border-default)] p-1">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 h-10 rounded-[var(--radius-md)]">
          <h2 className="title-text-bold text-[var(--text-primary)]">Apps</h2>
          <IconButton variant="ghost" size="icon" className="rounded-[var(--radius-md)]">
            <AddIcon size={16} />
          </IconButton>
        </div>

        {/* Content */}
        <div className="mt-1 flex flex-col flex-1 space-y-1">
          {/* Selected App Item */}
          <Row
            label="New app"
            selected={true}
            showChevron={true}
            size="comfort"
            className="rounded-[var(--radius-md)] shadow-none hover:shadow-none"
          />

          {/* Other App Items */}
          <Row
            label="Checklist"
            meta="/todo"
            size="comfort"
            className="rounded-[var(--radius-md)] shadow-none hover:shadow-none"
            onClick={() => onRowClick?.('Checklist')}
          />
          <Row
            label="Beta signup"
            meta="/beta-signup"
            size="comfort"
            className="rounded-[var(--radius-md)] shadow-none hover:shadow-none"
            onClick={() => onRowClick?.('Beta signup')}
          />
        </div>
      </div>
    </div>
  );
}
