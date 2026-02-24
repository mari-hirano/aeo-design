"use client";

import React, { createContext, useContext } from 'react';

interface InsightsNavigationContextType {
  navigateToSection: (section: string) => void;
}

const InsightsNavigationContext = createContext<InsightsNavigationContextType | undefined>(undefined);

export function InsightsNavigationProvider({ 
  children, 
  navigateToSection 
}: { 
  children: React.ReactNode;
  navigateToSection: (section: string) => void;
}) {
  return (
    <InsightsNavigationContext.Provider value={{ navigateToSection }}>
      {children}
    </InsightsNavigationContext.Provider>
  );
}

export function useInsightsNavigation() {
  const context = useContext(InsightsNavigationContext);
  if (context === undefined) {
    throw new Error('useInsightsNavigation must be used within an InsightsNavigationProvider');
  }
  return context;
}
