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
    
    // Only navigate to actual routes that exist as Next.js pages
    // Apps, CMS, and Insights are handled by state-based routing in LayoutContent
    if (section === 'home') {
      router.push('/');
    }
    // For apps, cms, insights: only update state, no URL navigation
    // This prevents 404 errors for non-existent pages
  };

  const openStyleGuide = () => {
    setIsStyleGuideOpen(true);
    router.push('/style-guide');
  };

  const closeStyleGuide = () => {
    setIsStyleGuideOpen(false);
    // Only navigate to home URL, let state handle other sections
    if (currentSection === 'home') {
      router.push('/');
    }
    // For other sections, just rely on state
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