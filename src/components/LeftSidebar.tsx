"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useNavigator } from '@/context/NavigatorContext';
import { useMode } from '@/context/ModeContext';
import { BASE_PATH } from '@/config/paths';
import { ActivityLog24Icon } from '@/icons/ActivityLog24Icon';
import { PagePanel24Icon } from '@/icons/PagePanel24Icon';
import { AssetManager24Icon } from '@/icons/AssetManager24Icon';
import { Audit24Icon } from '@/icons/Audit24Icon';
import { AIWand24Icon } from '@/icons/AIWand24Icon';
import { AddPanel24Icon } from '@/icons/AddPanel24Icon';
import { ComponentFill24Icon } from '@/icons/ComponentFill24Icon';
import { Navigator24Icon } from '@/icons/Navigator24Icon';
import { CapabilityApps24Icon } from '@/icons/CapabilityApps24Icon';
import { CapabilityVariable24Icon } from '@/icons/CapabilityVariable24Icon';
import { ToolbarSettings24Icon } from '@/icons/ToolbarSettings24Icon';
import { ToolbarSearch24Icon } from '@/icons/ToolbarSearch24Icon';
import { VideoTutorialsPanel24Icon } from '@/icons/VideoTutorialsPanel24Icon';
import { StyleManager24Icon } from '@/icons/StyleManager24Icon';
import Tooltip from './ui/tooltip';
import Panel from './Panel';
import AddPanel from './panels/AddPanel';
import PagesPanel from './panels/PagesPanel';
import NavigatorPanel from './panels/NavigatorPanel';

// Define panel types
type PanelType = 
  | 'add' 
  | 'pages' 
  | 'navigator' 
  | 'components' 
  | 'variables' 
  | 'styles' 
  | 'assets' 
  | 'apps' 
  | 'activityLog' 
  | null;

const LeftSidebar = () => {
  const { toggleNavigator } = useNavigator();
  const { mode } = useMode();
  const basePath = BASE_PATH;
  const [activePanel, setActivePanel] = useState<PanelType>(null);

  // Common style to ensure rgba(255, 255, 255, 0.67) color
  const iconStyle = { color: 'rgba(255, 255, 255, 0.68)' };

  // Function to toggle panels
  const togglePanel = (panel: PanelType) => {
    if (activePanel === panel) {
      setActivePanel(null);
    } else {
      setActivePanel(panel);
    }
  };

  return (
    <>
      <div 
        className="relative h-full w-[35px] bg-[#292929] border-r border-[#454545] flex-shrink-0"
      >
        {/* Top Icons */}
        <div className="flex flex-col pt-[4px]">
          {/* Top section */}
          <Tooltip text="Add Panel">
            <div 
              className={`w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group ${activePanel === 'add' ? 'bg-[#353535]' : ''}`}
              onClick={() => togglePanel('add')}
            >
              <AddPanel24Icon style={iconStyle} className={`group-hover:text-white transition-colors duration-150 ${activePanel === 'add' ? 'text-white' : ''}`} />
            </div>
          </Tooltip>
          
          <Tooltip text="Pages">
            <div 
              className={`w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group ${activePanel === 'pages' ? 'bg-[#353535]' : ''}`}
              onClick={() => togglePanel('pages')}
            >
              <PagePanel24Icon style={iconStyle} className={`group-hover:text-white transition-colors duration-150 ${activePanel === 'pages' ? 'text-white' : ''}`} />
            </div>
          </Tooltip>
          
          <Tooltip text="Navigator">
            <div 
              className={`w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group ${activePanel === 'navigator' ? 'bg-[#353535]' : ''}`}
              onClick={() => togglePanel('navigator')}
            >
              <Navigator24Icon style={iconStyle} className={`group-hover:text-white transition-colors duration-150 ${activePanel === 'navigator' ? 'text-white' : ''}`} />
            </div>
          </Tooltip>
          
          {/* First divider */}
          <div className="w-full h-[1px] bg-[#454545] my-2"></div>
          
          {/* Middle section */}
          <Tooltip text="Components">
            <div 
              className={`w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group ${activePanel === 'components' ? 'bg-[#353535]' : ''}`}
              onClick={() => togglePanel('components')}
            >
              <ComponentFill24Icon style={iconStyle} className={`group-hover:text-white transition-colors duration-150 ${activePanel === 'components' ? 'text-white' : ''}`} />
            </div>
          </Tooltip>
          
          <Tooltip text="Variables">
            <div 
              className={`w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group ${activePanel === 'variables' ? 'bg-[#353535]' : ''}`}
              onClick={() => togglePanel('variables')}
            >
              <CapabilityVariable24Icon style={iconStyle} className={`group-hover:text-white transition-colors duration-150 ${activePanel === 'variables' ? 'text-white' : ''}`} />
            </div>
          </Tooltip>
          
          <Tooltip text="Styles">
            <div 
              className={`w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group ${activePanel === 'styles' ? 'bg-[#353535]' : ''}`}
              onClick={() => togglePanel('styles')}
            >
              <StyleManager24Icon style={iconStyle} className={`group-hover:text-white transition-colors duration-150 ${activePanel === 'styles' ? 'text-white' : ''}`} />
            </div>
          </Tooltip>
          
          <Tooltip text="Assets">
            <div 
              className={`w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group ${activePanel === 'assets' ? 'bg-[#353535]' : ''}`}
              onClick={() => togglePanel('assets')}
            >
              <AssetManager24Icon style={iconStyle} className={`group-hover:text-white transition-colors duration-150 ${activePanel === 'assets' ? 'text-white' : ''}`} />
            </div>
          </Tooltip>
          
          {/* Second divider */}
          <div className="w-full h-[1px] bg-[#454545] my-2"></div>
          
          {/* Lower section */}
          <Tooltip text="Apps">
            <div 
              className={`w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group ${activePanel === 'apps' ? 'bg-[#353535]' : ''}`}
              onClick={() => togglePanel('apps')}
            >
              <CapabilityApps24Icon style={iconStyle} className={`group-hover:text-white transition-colors duration-150 ${activePanel === 'apps' ? 'text-white' : ''}`} />
            </div>
          </Tooltip>
          
          <Tooltip text="Activity Log">
            <div 
              className={`w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group ${activePanel === 'activityLog' ? 'bg-[#353535]' : ''}`}
              onClick={() => togglePanel('activityLog')}
            >
              <ActivityLog24Icon style={iconStyle} className={`group-hover:text-white transition-colors duration-150 ${activePanel === 'activityLog' ? 'text-white' : ''}`} />
            </div>
          </Tooltip>
        </div>

        {/* Bottom fixed icons */}
        <div className="absolute bottom-2 w-full flex flex-col">
          <Tooltip text="Settings">
            <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
              <ToolbarSettings24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
            </div>
          </Tooltip>
          
          <Tooltip text="AI Help">
            <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
              <AIWand24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
            </div>
          </Tooltip>
          
          <Tooltip text="Auditor">
            <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
              <Audit24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
            </div>
          </Tooltip>
          
          <Tooltip text="Search">
            <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
              <ToolbarSearch24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
            </div>
          </Tooltip>
          
          <Tooltip text="Videos">
            <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
              <VideoTutorialsPanel24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
            </div>
          </Tooltip>
        </div>
      </div>

      {/* Panels */}
      <Panel title="Add" isOpen={activePanel === 'add'}>
        <AddPanel />
      </Panel>
      
      <Panel title="Pages" isOpen={activePanel === 'pages'}>
        <PagesPanel />
      </Panel>
      
      <Panel title="Navigator" isOpen={activePanel === 'navigator'}>
        <NavigatorPanel />
      </Panel>
      
      <Panel title="Components" isOpen={activePanel === 'components'} />
      <Panel title="Variables" isOpen={activePanel === 'variables'} />
      <Panel title="Styles" isOpen={activePanel === 'styles'} />
      <Panel title="Assets" isOpen={activePanel === 'assets'} />
      <Panel title="Apps" isOpen={activePanel === 'apps'} />
      <Panel title="Activity Log" isOpen={activePanel === 'activityLog'} />
    </>
  );
};

export default LeftSidebar; 