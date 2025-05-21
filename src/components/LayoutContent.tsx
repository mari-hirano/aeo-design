"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import RightPanel from "@/components/RightPanel";
import Canvas from "@/components/Canvas";
import AppsSection from "@/components/sections/AppsSection";
import CMSSection from "@/components/sections/CMSSection";
import InsightsSection from "@/components/sections/InsightsSection";
import { NavigatorProvider } from "@/context/NavigatorContext";
import { PagesProvider } from "@/context/PagesContext";
import { useApp } from "@/context/AppContext";

interface LayoutContentProps {
  children?: React.ReactNode;
}

function LayoutContentInner({ children }: LayoutContentProps) {
  const pathname = usePathname();
  const { currentSection, isStyleGuideOpen } = useApp();
  
  // Check if the current path is the style guide
  if (isStyleGuideOpen) {
    return (
      <div className="flex h-screen flex-col">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }
  
  // Render different layouts based on section
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {currentSection === 'home' && (
          <>
            <LeftSidebar />
            <main className="flex-1 bg-[#1E1E1E] relative">
              <Canvas />
            </main>
            <RightPanel />
          </>
        )}
        
        {currentSection === 'apps' && (
          <main className="flex-1 bg-[#1E1E1E]">
            <AppsSection />
          </main>
        )}
        
        {currentSection === 'cms' && (
          <main className="flex-1 bg-[#1E1E1E]">
            <CMSSection />
          </main>
        )}
        
        {currentSection === 'insights' && (
          <main className="flex-1 bg-[#1E1E1E]">
            <InsightsSection />
          </main>
        )}
      </div>
    </div>
  );
}

export function LayoutContent(props: LayoutContentProps) {
  return (
    <NavigatorProvider>
      <PagesProvider>
        <LayoutContentInner {...props} />
      </PagesProvider>
    </NavigatorProvider>
  );
}
