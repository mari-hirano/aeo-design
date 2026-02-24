"use client";

import React, { useState } from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import { InsightsGoal } from '@/components/designer/sections/insights/InsightsGoalsListPanel';
import GoalsTable from '@/components/designer/sections/insights/GoalsTable';
import { GOALS_LIST } from '@/data/goals';

interface GoalsListPageProps {
  onGoalSelect: (goal: InsightsGoal) => void;
}

export default function GoalsListPage({ onGoalSelect }: GoalsListPageProps) {
  const { version } = useInsightsVersion();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<InsightsGoal | null>(null);

  const filteredGoals = GOALS_LIST.filter(goal =>
    goal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGoalSelect = (goal: InsightsGoal) => {
    setSelectedGoal(goal);
    onGoalSelect(goal);
  };

  return (
    <div className="flex-1 bg-[var(--bg-primary)] flex flex-col">
      <GoalsTable
        goals={filteredGoals}
        selectedGoal={selectedGoal}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onGoalSelect={handleGoalSelect}
      />
    </div>
  );
}

