"use client"

import React, { useState } from "react";
import { ColorsSection } from "./colors";
import { TypographySection } from "./typography";
import { ComponentsSection } from "./components";
import { IconsSection } from "./icons";
import "./style-guide.css";

export default function StyleGuide() {
  const [activeTab, setActiveTab] = useState("colors");
  
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary style-guide-root">
      <header className="px-6 py-4 border-b border-border-default">
        <h1 className="text-2xl font-bold">Design System</h1>
      </header>
      
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar */}
        <nav className="w-full md:w-64 p-6 border-r border-border-default">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("colors")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "colors" ? "bg-action-primary-bg text-text-primary" : "text-text-secondary hover:bg-bg-raised"
                }`}
              >
                Colors
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("typography")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "typography" ? "bg-action-primary-bg text-text-primary" : "text-text-secondary hover:bg-bg-raised"
                }`}
              >
                Typography
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("components")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "components" ? "bg-action-primary-bg text-text-primary" : "text-text-secondary hover:bg-bg-raised"
                }`}
              >
                Components
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("icons")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "icons" ? "bg-action-primary-bg text-text-primary" : "text-text-secondary hover:bg-bg-raised"
                }`}
              >
                Icons
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "colors" && <ColorsSection />}
          {activeTab === "typography" && <TypographySection />}
          {activeTab === "components" && <ComponentsSection />}
          {activeTab === "icons" && <IconsSection />}
        </main>
      </div>
    </div>
  );
} 