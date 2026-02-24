"use client";

import React from 'react';
import { PageDefaultIcon } from '@/icons';

interface PageItemProps {
  pageName: string;
  pageType?: 'Static' | 'CMS';
  size?: 'default' | 'small';
  className?: string;
}

export function PageItem({ 
  pageName, 
  pageType = 'Static',
  size = 'default',
  className = '' 
}: PageItemProps) {
  const isCMS = pageType === 'CMS';
  const iconColor = isCMS ? 'var(--text-purple)' : 'var(--text-secondary)';
  const textColor = isCMS ? 'text-[var(--text-purple)]' : (size === 'default' ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]');

  if (size === 'small') {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <PageDefaultIcon 
          size={16} 
          style={{ color: iconColor }}
        />
        <p className={`body-text text-[11.5px] leading-[16px] tracking-[-0.115px] overflow-hidden text-ellipsis whitespace-nowrap ${textColor}`}>
          {pageName}
        </p>
      </div>
    );
  }

  // Default size
  return (
    <div className={`flex items-center gap-0.5 w-full ${className}`}>
      <PageDefaultIcon 
        size={16} 
        style={{ color: iconColor }}
      />
      <p className={`flex-1 font-semibold text-[13px] leading-[18px] overflow-hidden text-ellipsis whitespace-nowrap ${textColor}`}>
        {pageName}
      </p>
    </div>
  );
}

