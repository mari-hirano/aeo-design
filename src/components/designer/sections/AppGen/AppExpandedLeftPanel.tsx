"use client";

import React from 'react';
import { Button } from '@/components/spring-ui/button';
import { IconButton } from '@/components/spring-ui/icon-button';
import { Row } from '@/components/spring-ui/row';
import { AddIcon, ChevronLargeRightIcon } from '@/icons';

export default function AppExpandedLeftPanel() {
  return (
    <div className="bg-[var(--bg-primary)] w-[280px] h-full border-r border-[var(--border-default)]">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 h-10 border-b border-[var(--border-default)]">
          <h2 className="title-text-bold text-[var(--text-primary)]">Apps</h2>
          <IconButton variant="ghost" size="comfortable">
            <AddIcon size={16} />
          </IconButton>
        </div>

        {/* Content */}
        <div className="flex flex-col p-2 flex-1">
          {/* Selected App Item */}
          <Row
            label="New app"
            selected={true}
            showChevron={true}
            size="comfort"
          />

          {/* Other App Items */}
          <Row
            label="Checklist"
            meta="/todo"
            size="comfort"
          />
          <Row
            label="Beta signup"
            meta="/beta-signup"
            size="comfort"
          />
        </div>
      </div>
    </div>
  );
}
