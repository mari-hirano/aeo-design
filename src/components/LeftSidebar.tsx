"use client";

import React from 'react';
import Image from 'next/image';
import { useNavigator } from '@/context/NavigatorContext';
import { useMode } from '@/context/ModeContext';

const LeftSidebar = () => {
  const { toggleNavigator } = useNavigator();
  const { mode } = useMode();

  return (
    <div 
      className="relative h-full w-[35px] bg-[#292929] border-r border-[#454545] flex-shrink-0"
    >
      {/* Top Icons */}
      <div className="flex flex-col pt-[8px]">
        {mode === 'Design' && (
          <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535]">
            <Image
              src="/orion/images/leftIcons/AddPanel24.svg"
              alt="Add Panel"
              width={24}
              height={24}
            />
          </div>
        )}

        {mode !== 'Design' && (
          <div 
            className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535]"
            onClick={toggleNavigator}
          >
            <Image
              src="/orion/images/leftIcons/Code Navigator24.svg"
              alt="Code Navigator"
              width={24}
              height={24}
            />
          </div>
        )}
        
        <div className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535]">
          <Image
            src="/orion/images/leftIcons/ThemePanel24.svg"
            alt="Theme Panel"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* Bottom Image */}
      <div className="absolute bottom-0 w-full">
        <Image
          src="/orion/images/LeftSidebarBottom.png"
          alt="Sidebar bottom"
          width={35}
          height={35}
        />
      </div>
    </div>
  );
};

export default LeftSidebar; 