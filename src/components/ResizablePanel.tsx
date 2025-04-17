"use client";

import React from 'react';

interface ResizablePanelProps {
  children: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  className?: string;
}

export function ResizablePanel({
  children,
  defaultSize,
  minSize,
  className = ""
}: ResizablePanelProps) {
  const style = {
    minWidth: minSize ? `${minSize}%` : undefined,
    width: defaultSize ? `${defaultSize}%` : undefined,
  };

  return (
    <div className={`h-full ${className}`} style={style}>
      {children}
    </div>
  );
} 