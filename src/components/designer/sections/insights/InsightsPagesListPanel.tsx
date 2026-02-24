"use client";

import React from 'react';
import { Row } from '@/components/spring-ui/row';
import { PageDefaultIcon } from '@/icons';

export interface InsightsPage {
  id: string;
  name: string;
  itemCount?: number;
  path?: string;
  variant?: 'Static' | 'CMS';
  modifiedDate?: string;
}

interface InsightsPagesListPanelProps {
  pages: InsightsPage[];
  selectedPage: InsightsPage | null;
  onPageSelect: (page: InsightsPage) => void;
}

export default function InsightsPagesListPanel({ 
  pages, 
  selectedPage, 
  onPageSelect 
}: InsightsPagesListPanelProps) {
  return (
    <div className="w-[248px] h-full bg-[var(--bg-primary)] border-r border-[var(--border-default)] flex flex-col">
      {/* Header */}
      <div className="h-10 px-2 flex items-center">
        <h2 className="title-text-bold text-[var(--text-primary)] px-2">Pages</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {pages.map((page) => {
          const isSelected = selectedPage?.id === page.id;
          const isCMS = page.variant === 'CMS';
          
          // Icon color: always purple for CMS, primary when selected for Static, secondary otherwise
          const iconColor = isCMS 
            ? 'var(--text-purple)'
            : (isSelected ? 'var(--text-primary)' : 'var(--text-secondary)');
          
          // Text color: always purple for CMS, default otherwise
          const textColor = isCMS ? 'text-[var(--text-purple)]' : '';
          
          return (
            <div
              key={page.id}
              onClick={() => onPageSelect(page)}
              className={`
                cursor-pointer transition-colors duration-200 group px-2 py-0.5
                ${isSelected ? 'bg-[var(--bg-accent)]' : 'hover:bg-[var(--bg-hover)]'}
              `}
            >
              <Row
                label={page.name}
                icon={<PageDefaultIcon size={16} style={{ color: iconColor }} />}
                selected={isSelected}
                showChevron={isSelected}
                className={textColor}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

