"use client";

import React from 'react';
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
import Tooltip from './Tooltip';

const LeftSidebar = () => {
  const { toggleNavigator } = useNavigator();
  const { mode } = useMode();
  const basePath = BASE_PATH;

  // Common style to ensure rgba(255, 255, 255, 0.67) color
  const iconStyle = { color: 'rgba(255, 255, 255, 0.67)' };

  return (
    <div 
      className="relative h-full w-[35px] bg-[#292929] border-r border-[#454545] flex-shrink-0"
    >
      {/* Top Icons */}
      <div className="flex flex-col pt-[4px]">
        {/* Top section */}
        <Tooltip text="Add Panel">
          <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
            <AddPanel24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
          </div>
        </Tooltip>
        
        <Tooltip text="Pages">
          <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
            <PagePanel24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
          </div>
        </Tooltip>
        
        <Tooltip text="Navigator">
          <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
            <Navigator24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
          </div>
        </Tooltip>
        
        {/* First divider */}
        <div className="w-full h-[1px] bg-[#454545] my-2"></div>
        
        {/* Middle section */}
        <Tooltip text="Components">
          <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
            <ComponentFill24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
          </div>
        </Tooltip>
        
        <Tooltip text="Variables">
          <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
            <CapabilityVariable24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
          </div>
        </Tooltip>
        
        <Tooltip text="Styles">
          <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
            <StyleManager24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
          </div>
        </Tooltip>
        
        <Tooltip text="Assets">
          <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
            <AssetManager24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
          </div>
        </Tooltip>
        
        {/* Second divider */}
        <div className="w-full h-[1px] bg-[#454545] my-2"></div>
        
        {/* Lower section */}
        <Tooltip text="Apps">
          <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
            <CapabilityApps24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
          </div>
        </Tooltip>
        
        <Tooltip text="Activity Log">
          <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535] group">
            <ActivityLog24Icon style={iconStyle} className="group-hover:text-white transition-colors duration-150" />
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
  );
};

export default LeftSidebar; 