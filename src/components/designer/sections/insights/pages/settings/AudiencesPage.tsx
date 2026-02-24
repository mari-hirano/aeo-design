"use client";

import React from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';

export default function AudiencesPage() {
  const { version } = useInsightsVersion();

  return (
    <div className="flex-1 bg-[var(--bg-primary)] flex flex-col">
      <div className="p-4">
        <div className="grid grid-cols-12 gap-3">
          {/* Content will be added here */}
        </div>
      </div>
    </div>
  );
}

