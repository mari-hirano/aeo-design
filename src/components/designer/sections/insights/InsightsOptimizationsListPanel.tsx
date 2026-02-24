"use client";

export interface InsightsOptimization {
  id: string;
  name: string;
  type: 'personalization' | 'test' | 'ai-optimize';
  primaryGoal: string;
  changes: string;
  status: 'live' | 'ready' | 'paused' | 'draft' | 'archived';
  lastUpdated: string;
}

