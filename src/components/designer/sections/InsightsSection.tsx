"use client";

import React, { useState } from 'react';
import InsightsLeftSidebar from './InsightsLeftSidebar';
import AnalyzeSiteOverview from './AnalyzeSiteOverview';

export default function InsightsSection() {
  const [selectedSection, setSelectedSection] = useState("site-overview");

  const renderMainContent = () => {
    switch (selectedSection) {
      case "site-overview":
        return <AnalyzeSiteOverview />;
      case "page-performance":
        return (
          <div className="flex-1 bg-[var(--bg-primary)] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Page Performance</h1>
              <p className="text-[var(--text-secondary)]">Page performance analytics coming soon</p>
            </div>
          </div>
        );
      case "user-behavior":
        return (
          <div className="flex-1 bg-[var(--bg-primary)] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">User Behavior</h1>
              <p className="text-[var(--text-secondary)]">User behavior analytics coming soon</p>
            </div>
          </div>
        );
      default:
        return <AnalyzeSiteOverview />;
    }
  };

  return (
    <div className="flex h-full">
      <InsightsLeftSidebar selectedSection={selectedSection} onSectionChange={setSelectedSection} />
      {renderMainContent()}
    </div>
  );
} 