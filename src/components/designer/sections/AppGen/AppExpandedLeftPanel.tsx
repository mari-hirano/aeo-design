"use client";

import React from 'react';
import { Button } from '@/components/spring-ui/button';
import { IconButton } from '@/components/spring-ui/icon-button';
import { AddIcon, AnalyzeIcon, ChevronLargeRightIcon } from '@/icons';

export default function AppExpandedLeftPanel() {
  return (
    <div className="bg-[var(--bg-primary)] w-[280px] h-full border-r border-[var(--border-default)]">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 h-10 border-b border-[var(--border-default)]">
          <h2 className="title-text-bold text-[var(--text-primary)]">Apps</h2>
          <IconButton variant="ghost" size="icon">
            <AddIcon size={16} />
          </IconButton>
        </div>

        {/* Content */}
        <div className="flex flex-col p-2 flex-1">
          {/* Selected App Item */}
          <div className="bg-[var(--bg-raised)] rounded p-2 mb-2">
            <div className="flex items-center gap-2 min-h-[32px] px-2 py-1">
              <div className="flex-shrink-0">
                <AnalyzeIcon size={16} className="text-[var(--text-primary)]" />
              </div>
              <div className="flex-1">
                <p className="body-text text-[var(--text-primary)]">Articles</p>
              </div>
            </div>
          </div>

          {/* Other App Items */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 min-h-[32px] px-2 py-1 rounded hover:bg-[var(--bg-raised)]">
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <p className="body-text text-[var(--text-primary)]">Checklist</p>
                  <p className="body-text text-[var(--text-secondary)]">/todo</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 min-h-[32px] px-2 py-1 rounded hover:bg-[var(--bg-raised)]">
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <p className="body-text text-[var(--text-primary)]">Beta signup</p>
                  <p className="body-text text-[var(--text-secondary)]">/beta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
