"use client";

import React from 'react';

interface BlankComponentCardProps {
  componentName: string;
  variant?: string;
  className?: string;
}

export function BlankComponentCard({ 
  componentName, 
  variant,
  className = '' 
}: BlankComponentCardProps) {
  const displayName = variant ? `${componentName} (${variant})` : componentName;

  return (
    <div 
      className={`bg-[var(--bg-primary)] border border-[var(--border-default)] rounded flex items-center justify-center ${className}`}
      style={{ minHeight: '60px' }}
    >
      <span className="text-[var(--text-primary)] body-text">{displayName}</span>
    </div>
  );
}

