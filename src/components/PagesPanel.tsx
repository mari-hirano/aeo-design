"use client";

import React from 'react';
import { MoreHorizontal, Search, ArrowLeft } from 'lucide-react';

export function PagesPanel() {
  return (
    <div className="flex flex-col min-h-0 bg-[#292929]">
      {/* Header */}
      <div className="h-[40px] flex-none flex items-center justify-between px-2 border-b border-[#454545]">
        <span className="font-semibold text-[13px] leading-[20px] text-white font-inter whitespace-nowrap">
          Pages
        </span>
        <button className="w-[16px] h-[16px] flex items-center justify-center text-[#CCCCCC] hover:text-white">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Subheading */}
      <div className="h-[32px] flex-none flex items-center px-2 border-b border-[#454545]">
        <div className="flex items-center gap-1 text-[#CCCCCC] hover:text-white cursor-pointer">
          <ArrowLeft size={14} />
          <span className="text-[12px] leading-[16px] font-inter">
            Doggo training web app
          </span>
        </div>
      </div>

      {/* Search Box */}
      <div className="flex-none px-2 py-2">
        <div className="flex items-center h-[24px] bg-[#212121] rounded-[4px] px-2 border border-[#464646]">
          <Search size={12} className="text-[#CCCCCC]" />
          <input
            type="text"
            placeholder="Search pages"
            className="bg-transparent border-none text-[#CCCCCC] text-[12px] leading-[16px] px-2 w-full focus:outline-none placeholder-[#808080]"
          />
        </div>
      </div>

      {/* Pages Content */}
      <div className="flex-1 overflow-auto py-1">
        {/* Add your pages content here */}
        <div className="px-2 py-1 text-[12px] leading-[16px] text-white opacity-80 hover:opacity-100 cursor-pointer">
          Home
        </div>
        <div className="px-2 py-1 text-[12px] leading-[16px] text-white opacity-80 hover:opacity-100 cursor-pointer">
          About
        </div>
        <div className="px-2 py-1 text-[12px] leading-[16px] text-white opacity-80 hover:opacity-100 cursor-pointer">
          Services
        </div>
        <div className="px-2 py-1 text-[12px] leading-[16px] text-white opacity-80 hover:opacity-100 cursor-pointer">
          Contact
        </div>
      </div>
    </div>
  );
} 