"use client";

import React, { useState } from 'react';
import AppsEmptyState from './AppGen/empty-state/AppsEmptyState';
import AppExpandedLeftPanel from './AppGen/empty-state/AppExpandedLeftPanel';
import AppGenView from './AppGen/AppGenView';

export default function AppsSection() {
  const [currentView, setCurrentView] = useState<'empty' | 'app-gen'>('empty');

  const handleRowClick = (rowLabel: string) => {
    setCurrentView('app-gen');
  };

  const handleSubmit = () => {
    setCurrentView('app-gen');
  };

  if (currentView === 'app-gen') {
    return <AppGenView />;
  }

  return (
    <div className="flex h-full">
      <AppExpandedLeftPanel onRowClick={handleRowClick} />
      <AppsEmptyState onSubmit={handleSubmit} />
    </div>
  );
} 