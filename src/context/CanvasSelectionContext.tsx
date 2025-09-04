"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define breadcrumb item type
export interface BreadcrumbItem {
  id: string;
  label: string;
  isActive?: boolean;
}

// Define breakpoint type
export type Breakpoint = 'desktop' | 'tablet' | 'mobile-landscape' | 'mobile';

interface CanvasSelectionContextType {
  breadcrumbs: BreadcrumbItem[];
  currentBreakpoint: Breakpoint;
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  addBreadcrumb: (item: BreadcrumbItem) => void;
  removeBreadcrumb: (id: string) => void;
  setCurrentBreakpoint: (breakpoint: Breakpoint) => void;
  onBreadcrumbClick: (item: BreadcrumbItem) => void;
  onUndo: () => void;
  onRedo: () => void;
}

const CanvasSelectionContext = createContext<CanvasSelectionContextType | undefined>(undefined);

interface CanvasSelectionProviderProps {
  children: ReactNode;
}

export function CanvasSelectionProvider({ children }: CanvasSelectionProviderProps) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: 'body', label: 'Body', isActive: true },
    { id: 'contact-intro', label: 'Contact Intro' },
    { id: 'container', label: 'Container' },
    { id: 'div', label: 'Div' }
  ]);
  
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('desktop');

  const addBreadcrumb = (item: BreadcrumbItem) => {
    setBreadcrumbs(prev => [...prev, item]);
  };

  const removeBreadcrumb = (id: string) => {
    setBreadcrumbs(prev => prev.filter(item => item.id !== id));
  };

  const onBreadcrumbClick = (item: BreadcrumbItem) => {
    // Find the index of the clicked item
    const itemIndex = breadcrumbs.findIndex(b => b.id === item.id);
    
    if (itemIndex !== -1) {
      // Update all breadcrumbs to set the clicked one as active
      setBreadcrumbs(prev => 
        prev.map((b, index) => ({
          ...b,
          isActive: index === itemIndex
        }))
      );
    }
  };

  const onUndo = () => {
    // TODO: Implement undo functionality
    console.log('Undo action triggered');
  };

  const onRedo = () => {
    // TODO: Implement redo functionality
    console.log('Redo action triggered');
  };

  const value: CanvasSelectionContextType = {
    breadcrumbs,
    currentBreakpoint,
    setBreadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    setCurrentBreakpoint,
    onBreadcrumbClick,
    onUndo,
    onRedo
  };

  return (
    <CanvasSelectionContext.Provider value={value}>
      {children}
    </CanvasSelectionContext.Provider>
  );
}

export function useCanvasSelection() {
  const context = useContext(CanvasSelectionContext);
  if (context === undefined) {
    throw new Error('useCanvasSelection must be used within a CanvasSelectionProvider');
  }
  return context;
}
