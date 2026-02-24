"use client";

import React from 'react';
import { Row } from '@/components/spring-ui/row';
import { getGoalIcon } from '@/data/goals';

export interface InsightsGoal {
  id: string;
  name: string;
  itemCount?: number;
  modifiedDate?: string;
}

interface InsightsGoalsListPanelProps {
  goals: InsightsGoal[];
  selectedGoal: InsightsGoal | null;
  onGoalSelect: (goal: InsightsGoal) => void;
}

export default function InsightsGoalsListPanel({ 
  goals, 
  selectedGoal, 
  onGoalSelect 
}: InsightsGoalsListPanelProps) {
  return (
    <div className="w-[248px] h-full bg-[var(--bg-primary)] border-r border-[var(--border-default)] flex flex-col">
      {/* Header */}
      <div className="h-10 px-2 flex items-center">
        <h2 className="title-text-bold text-[var(--text-primary)] px-2">Goals</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {goals.map((goal) => {
          const isSelected = selectedGoal?.id === goal.id;
          
          // Icon color: primary when selected, secondary otherwise
          const iconColor = isSelected ? 'var(--text-primary)' : 'var(--text-secondary)';
          const GoalIcon = getGoalIcon(goal);
          
          return (
            <div
              key={goal.id}
              onClick={() => onGoalSelect(goal)}
              className={`
                cursor-pointer transition-colors duration-200 group px-2 py-0.5
                ${isSelected ? 'bg-[var(--bg-accent)]' : 'hover:bg-[var(--bg-hover)]'}
              `}
            >
              <Row
                label={goal.name}
                icon={<GoalIcon size={16} style={{ color: iconColor }} />}
                selected={isSelected}
                showChevron={isSelected}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

