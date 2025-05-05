"use client";

import React, { useState } from 'react';
import { TabBar, TabBarItem } from '@/components/ui/tab-bar';
import StyleTabContent from '@/components/panels/StyleTabContent';
import SettingsTabContent from '@/components/panels/SettingsTabContent';
import InteractionsTabContent from '@/components/panels/InteractionsTabContent';
import { IconButton } from '@/components/ui/icon-button';
import { 
  MoreIcon,
  AISparkleIcon,
  ElementDivIcon,
  ElementPlusComponentIcon
} from '@/icons';

const RightPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('style');

  return (
    <div className="w-[240px] h-[calc(100vh-35px)] bg-[#292929] border-l border-[#454545] flex flex-col">
      {/* Panel header */}
      <div className="flex items-center justify-between h-9 px-2 py-2">
        <div className="flex items-center gap-1">
          <IconButton 
            variant="ghost" 
            size="compact" 
            aria-label="Element div"
            className="h-4 w-4"
          >
            <ElementDivIcon size={16} />
          </IconButton>
          <h2 className="text-white body-text">Element Properties</h2>
        </div>
        <div className="flex items-center gap-1 color-text-secondary">
          <IconButton 
            variant="ghost" 
            size="comfortable" 
            aria-label="More options"
            className="h-6 w-6 color-text-secondary"
          >
            <MoreIcon size={16} />
          </IconButton>
          <IconButton 
            variant="ghost" 
            size="comfortable" 
            aria-label="More options"
            className="h-6 w-6 color-text-secondary"
          >
            <ElementPlusComponentIcon size={16} />
          </IconButton>
          <IconButton 
            variant="ghost" 
            size="comfortable" 
            aria-label="Element properties"
            className="h-6 w-6 bg-purple-600"
          >
            <AISparkleIcon size={16} />
          </IconButton>
        </div>
      </div>
      
      {/* Tab bar */}
      <div>
        <TabBar
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabBarItem value="style">Style</TabBarItem>
          <TabBarItem value="settings">Settings</TabBarItem>
          <TabBarItem value="interactions">Interactions</TabBarItem>
        </TabBar>
      </div>

      {/* Tab content */}
      <div className="flex-1 right-panel-content-wrapper">
        <div className="flex-1 right-panel-content">
          {activeTab === 'style' && <StyleTabContent />}
          {activeTab === 'settings' && <SettingsTabContent />}
          {activeTab === 'interactions' && <InteractionsTabContent />}
        </div>
      </div>

      <style jsx global>{`
        /* Custom scrollbar styles with absolute positioning */
        .right-panel-content-wrapper {
          position: relative;
          overflow: hidden;
        }
        
        .right-panel-content {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          overflow-y: scroll;
          overflow-x: hidden;
        }
        
        /* Custom scrollbar styling */
        .right-panel-content::-webkit-scrollbar {
          width: 8px;
          background-color: transparent;
          position: absolute;
          right: 0;
        }
        
        .right-panel-content::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 0px;
          transition: background-color 0.2s ease;
        }
        
        .right-panel-content:hover::-webkit-scrollbar-thumb {
          background-color: rgba(69, 69, 69, 0.7);
        }
        
        .right-panel-content::-webkit-scrollbar-track {
          background-color: transparent;
        }
        
        /* For Firefox */
        .right-panel-content {
          scrollbar-width: none; /* Hide the default scrollbar */
        }
        
        /* Add a custom scrollbar for Firefox that doesn't affect layout */
        @-moz-document url-prefix() {
          .right-panel-content-wrapper:hover::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 8px;
            height: 100%;
            background-color: rgba(69, 69, 69, 0.7);
            z-index: 100;
            opacity: 0.7;
            border-radius: 0px;
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
};

export default RightPanel; 