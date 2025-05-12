"use client"

import React, { useState } from "react";
import { ColorsSection } from "./colors";
import { TypographySection } from "./typography";
import { ComponentsSection } from "./components";
import { IconsSection } from "./icons";
import { TabBar, TabBarItem } from "@/components/ui/tab-bar";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/icons/ArrowLeftIcon";
import Link from "next/link";

export default function StyleGuide() {
  const [activeTab, setActiveTab] = useState("colors");
  
  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <header className="sticky top-0 z-10 bg-[var(--bg-primary)] px-6 pt-4 pb-0 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Spring Design System</h1>
          <Button variant="outline" size="default" asChild>
            <Link href="/">
              <ArrowLeftIcon className="mr-1" />
              Back to App
            </Link>
          </Button>
        </div>
        <div className="mt-6">
          <TabBar value={activeTab} onValueChange={setActiveTab}>
            <TabBarItem value="colors">Colors</TabBarItem>
            <TabBarItem value="typography">Typography</TabBarItem>
            <TabBarItem value="components">Components</TabBarItem>
            <TabBarItem value="icons">Icons</TabBarItem>
          </TabBar>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {activeTab === "colors" && <ColorsSection />}
        {activeTab === "typography" && <TypographySection />}
        {activeTab === "components" && <ComponentsSection />}
        {activeTab === "icons" && <IconsSection />}
      </main>
    </div>
  );
} 