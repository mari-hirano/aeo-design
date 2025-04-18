"use client";

import React, { createContext, useContext, useState } from 'react';

interface PagesContextType {
  isPagesOpen: boolean;
  togglePages: () => void;
}

const PagesContext = createContext<PagesContextType | undefined>(undefined);

export function PagesProvider({ children }: { children: React.ReactNode }) {
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  const togglePages = () => {
    setIsPagesOpen(!isPagesOpen);
  };

  return (
    <PagesContext.Provider value={{ isPagesOpen, togglePages }}>
      {children}
    </PagesContext.Provider>
  );
}

export function usePages() {
  const context = useContext(PagesContext);
  if (context === undefined) {
    throw new Error('usePages must be used within a PagesProvider');
  }
  return context;
} 