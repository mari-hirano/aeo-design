"use client";

import React from 'react';
import Image from 'next/image';
import { useNavigator } from '@/context/NavigatorContext';

const LeftSidebar = () => {
  const { toggleNavigator } = useNavigator();

  return (
    <div 
      className="relative h-full w-[35px] bg-[#292929] border-r border-[#454545] flex-shrink-0"
    >
      {/* Top Icons */}
      <div className="flex flex-col pt-[8px]">
        <div 
          className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer hover:bg-[#353535]"
          onClick={toggleNavigator}
        >
          <Image
            src="/images/leftIcons/Code Navigator24.svg"
            alt="Code Navigator"
            width={24}
            height={24}
          />
        </div>
        <div className="w-[35px] h-[35px] flex items-center justify-center">
          <Image
            src="/images/leftIcons/ThemePanel24.svg"
            alt="Theme Panel"
            width={24}
            height={24}
          />
        </div>
        <div className="w-[35px] h-[35px] flex items-center justify-center">
          <Image
            src="/images/leftIcons/ComponentFill24.svg"
            alt="Component Fill"
            width={24}
            height={24}
          />
        </div>
        <div className="w-[35px] h-[35px] flex items-center justify-center">
          <Image
            src="/images/leftIcons/CapabilityVariable24.svg"
            alt="Capability Variable"
            width={24}
            height={24}
          />
        </div>
        <div className="w-[35px] h-[35px] flex items-center justify-center">
          <Image
            src="/images/leftIcons/Icons - 24.svg"
            alt="Icons"
            width={24}
            height={24}
          />
        </div>
        <div className="w-[35px] h-[35px] flex items-center justify-center">
          <Image
            src="/images/leftIcons/AssetManager24.svg"
            alt="Asset Manager"
            width={24}
            height={24}
          />
        </div>
        <div className="w-[35px] h-[35px] flex items-center justify-center">
          <Image
            src="/images/leftIcons/CapabilityApps24.svg"
            alt="Capability Apps"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* Bottom Image */}
      <div className="absolute bottom-0 w-full">
        <Image
          src="/images/LeftSidebarBottom.png"
          alt="Sidebar bottom"
          width={35}
          height={35}
        />
      </div>
    </div>
  );
};

export default LeftSidebar; 