"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type AppSection = 'home' | 'apps' | 'cms' | 'insights';

type AppContextType = {
  currentSection: AppSection;
  navigateTo: (section: AppSection) => void;
  isStyleGuideOpen: boolean;
  openStyleGuide: () => void;
  closeStyleGuide: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentSection, setCurrentSection] = useState<AppSection>('home');
  const [isStyleGuideOpen, setIsStyleGuideOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Sync URL path with state
    if (pathname) {
      if (pathname.includes('/style-guide')) {
        setIsStyleGuideOpen(true);
      } else {
        setIsStyleGuideOpen(false);
        
        if (pathname.includes('/apps')) {
          setCurrentSection('apps');
        } else if (pathname.includes('/cms')) {
          setCurrentSection('cms');
        } else if (pathname.includes('/insights')) {
          setCurrentSection('insights');
        } else {
          setCurrentSection('home');
        }
      }
    }
  }, [pathname]);

  const navigateTo = (section: AppSection) => {
    setCurrentSection(section);
    router.push(`/${section === 'home' ? '' : section}`);
  };

  const openStyleGuide = () => {
    setIsStyleGuideOpen(true);
    router.push('/style-guide');
  };

  const closeStyleGuide = () => {
    setIsStyleGuideOpen(false);
    router.push(`/${currentSection === 'home' ? '' : currentSection}`);
  };

  return (
    <AppContext.Provider value={{ 
      currentSection, 
      navigateTo, 
      isStyleGuideOpen, 
      openStyleGuide, 
      closeStyleGuide 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 