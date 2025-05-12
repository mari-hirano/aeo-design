"use client";

import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="group relative flex">
      {children}
      <div className="absolute left-[35px] top-1/2 transform -translate-y-1/2 hidden group-hover:block z-50">
        <div className="flex items-center">
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[6px] border-r-[#404040] border-b-[6px] border-b-transparent"></div>
          <div className="color-bg-tertiary body-text p-2 rounded whitespace-nowrap"
               style={{
                 boxShadow: '0px 0.5px 0.5px 0px rgba(255, 255, 255, 0.12) inset, 0px -0.5px 0.5px 0px rgba(0, 0, 0, 0.12) inset, 0px 2px 6px 0px rgba(0, 0, 0, 0.08), 0px 4px 8px 2px rgba(0, 0, 0, 0.08), 0px 8px 16px 4px rgba(0, 0, 0, 0.08), 0px 12px 24px 8px rgba(0, 0, 0, 0.08)'
               }}>
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tooltip; 