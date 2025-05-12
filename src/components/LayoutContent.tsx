"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import RightPanel from "@/components/RightPanel";
import Canvas from "@/components/Canvas";
import { NavigatorProvider } from "@/context/NavigatorContext";
import { PagesProvider } from "@/context/PagesContext";

interface LayoutContentProps {
  children?: React.ReactNode;
}

function LayoutContentInner({ children }: LayoutContentProps) {
  const pathname = usePathname();
  
  // Check if the current path is a special page that should render directly
  const isSpecialPage = pathname?.includes('/style-guide');
  
  if (isSpecialPage) {
    return (
      <div className="flex h-screen flex-col">
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }
  
  // Regular app layout
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 bg-[#1E1E1E] relative">
          <Canvas />
        </main>
        <RightPanel />
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
