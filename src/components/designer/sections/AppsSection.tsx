"use client";

import React from 'react';
import AppsEmptyState from './AppGen/AppsEmptyState';
import AppExpandedLeftPanel from './AppGen/AppExpandedLeftPanel';

export default function AppsSection() {
  return (
    <div className="flex h-full">
      <AppExpandedLeftPanel />
      <AppsEmptyState />
    </div>
  );
} 