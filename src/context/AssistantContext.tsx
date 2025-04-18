"use client";

import React, { createContext, useContext, useState } from 'react';

type AssistantContextType = {
  isAssistantOpen: boolean;
  setIsAssistantOpen: (isOpen: boolean) => void;
};

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export function AssistantProvider({ children }: { children: React.ReactNode }) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(true);

  return (
    <AssistantContext.Provider value={{ isAssistantOpen, setIsAssistantOpen }}>
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  const context = useContext(AssistantContext);
  if (context === undefined) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
} 