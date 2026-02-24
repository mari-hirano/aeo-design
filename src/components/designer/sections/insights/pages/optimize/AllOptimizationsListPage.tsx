"use client";

import React, { useState } from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { InsightsOptimization } from '@/components/designer/sections/insights/InsightsOptimizationsListPanel';
import OptimizationsTable from '@/components/designer/sections/insights/OptimizationsTable';
import { OPTIMIZATIONS_LIST } from '@/data/optimizations';
interface AllOptimizationsListPageProps {
  onOptimizationSelect: (optimizationId: string) => void;
}

export default function AllOptimizationsListPage({ onOptimizationSelect }: AllOptimizationsListPageProps) {
  const { version } = useInsightsVersion();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOptimization, setSelectedOptimization] = useState<InsightsOptimization | null>(null);

  const filteredOptimizations = OPTIMIZATIONS_LIST.filter(optimization =>
    optimization.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptimizationSelect = (optimization: InsightsOptimization) => {
    setSelectedOptimization(optimization);
    onOptimizationSelect(optimization.id);
  };

  return (
    <div className="flex-1 bg-[var(--bg-primary)] flex flex-col">
      <OptimizationsTable
        optimizations={filteredOptimizations}
        selectedOptimization={selectedOptimization}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOptimizationSelect={handleOptimizationSelect}
      />
    </div>
  );
}

