"use client";

import React, { useState, useEffect } from 'react';
import { useInsightsVersion } from '@/context/InsightsVersionContext';
import InsightsGoalsListPanel, { InsightsGoal } from '@/components/designer/sections/insights/InsightsGoalsListPanel';
import { GOALS_LIST } from '@/data/goals';

interface GoalsDetailPageProps {
  selectedGoalId?: string | null;
}

export default function GoalsDetailPage({ selectedGoalId }: GoalsDetailPageProps) {
  const { version } = useInsightsVersion();
  const [selectedGoal, setSelectedGoal] = useState<InsightsGoal | null>(
    GOALS_LIST.find(g => g.id === selectedGoalId) || GOALS_LIST[0] || null
  );

  // Sync selected goal when selectedGoalId prop changes
  useEffect(() => {
    if (selectedGoalId) {
      const goal = GOALS_LIST.find(g => g.id === selectedGoalId);
      if (goal) {
        setSelectedGoal(goal);
      }
    }
  }, [selectedGoalId]);

  const handleGoalSelect = (goal: InsightsGoal) => {
    setSelectedGoal(goal);
  };

  return (
    <div className="flex h-full bg-[var(--bg-primary)]">
      {/* Left Navigation Panel */}
      <InsightsGoalsListPanel
        goals={GOALS_LIST}
        selectedGoal={selectedGoal}
        onGoalSelect={handleGoalSelect}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Right Detail Content */}
        <div className="flex-1 bg-[var(--bg-primary)] flex flex-col">
          <div className="p-4">
            <div className="grid grid-cols-12 gap-3">
              {/* Content will be added here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

