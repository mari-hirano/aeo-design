"use client";

import { Navbar } from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import { NavigatorProvider } from "@/context/NavigatorContext";
import { PagesProvider } from "@/context/PagesContext";

interface LayoutContentProps {
  children?: React.ReactNode;
}

function LayoutContentInner({ children }: LayoutContentProps) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 overflow-auto bg-[#1E1E1E]">
          {children}
        </main>
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
