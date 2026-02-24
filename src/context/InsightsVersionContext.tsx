"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { InsightsVersionState } from '@/types/insights';

type InsightsVersionContextType = {
  version: InsightsVersionState;
  setVersion: (version: InsightsVersionState) => void;
};

const InsightsVersionContext = createContext<InsightsVersionContextType | undefined>(undefined);

export function InsightsVersionProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState<InsightsVersionState>('current');

  return (
    <InsightsVersionContext.Provider value={{ version, setVersion }}>
      {children}
    </InsightsVersionContext.Provider>
  );
}

export function useInsightsVersion() {
  const context = useContext(InsightsVersionContext);
  if (context === undefined) {
    throw new Error('useInsightsVersion must be used within an InsightsVersionProvider');
  }
  return context;
}
