"use client";

import React, { useState } from 'react';
import { FolderPlus, FilePlus, Search, ChevronRight, File, SquareCode } from 'lucide-react';
import { usePages } from '@/context/PagesContext';

export function PagesPanel() {
  const [isStaticPagesOpen, setIsStaticPagesOpen] = useState(true);
  const [isWebAppsOpen, setIsWebAppsOpen] = useState(true);
  const [isCmsOpen, setIsCmsOpen] = useState(true);
  const [isUtilityOpen, setIsUtilityOpen] = useState(true);
  const { selectedPage, setSelectedPage, setIsPagesOpen } = usePages();

  const iconStyle = "text-white opacity-[0.67] [stroke-width:2px]";

  const handlePageSelect = (page: string) => {
    setSelectedPage(page);
    setIsPagesOpen(false);
  };

  return (
    <div className="flex flex-col min-h-0 bg-[#292929]">
      {/* Header */}
      <div className="h-[40px] flex-none flex items-center justify-between px-2">
        <span className="font-semibold text-[13px] leading-[20px] text-white font-inter whitespace-nowrap">
          Pages
        </span>
        <div className="flex items-center gap-2">
          <button className="w-[16px] h-[16px] flex items-center justify-center hover:opacity-100">
            <FilePlus className="w-[14px] h-[14px] text-white/67" strokeWidth={2} />
          </button>
          <button className="w-[16px] h-[16px] flex items-center justify-center hover:opacity-100">
            <FolderPlus className="w-[14px] h-[14px] text-white/67" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Search Box */}
      <div className="flex-none px-2 pb-2 border-b border-[#454545]">
        <div className="flex items-center h-[24px] bg-[#212121] rounded-[4px] px-2 border border-[#464646]">
          <Search className="w-[14px] h-[14px] text-white/50" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search pages"
            className="bg-transparent border-none text-[#CCCCCC] text-[12px] leading-[16px] px-2 w-full focus:outline-none placeholder-[#808080]"
          />
        </div>
      </div>

      {/* Pages Content */}
      <div className="flex-1 overflow-auto">
        {/* Static Pages Section */}
        <div className="border-b border-[#454545] pb-2">
          <div 
            onClick={() => setIsStaticPagesOpen(!isStaticPagesOpen)}
            className="flex items-center justify-between px-2 h-[40px] text-white font-semibold text-[13px] leading-[20px] font-inter cursor-pointer"
          >
            <span>Static pages</span>
            <ChevronRight 
              className={`w-[14px] h-[14px] transition-transform ${isStaticPagesOpen ? 'rotate-90' : 'rotate-0'} ${iconStyle}`}
              strokeWidth={2}
            />
          </div>
          <div className={isStaticPagesOpen ? "" : "hidden"}>
            <div 
              onClick={() => handlePageSelect("home")}
              className={`px-2 py-1 text-[12px] leading-[16px] text-white cursor-pointer flex items-center gap-1 ${
                selectedPage === "home" 
                  ? "bg-[#3F3F3F] opacity-100" 
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <File className="w-[14px] h-[14px]" strokeWidth={2} />
              Home
            </div>
            <div 
              onClick={() => handlePageSelect("about")}
              className={`px-2 py-1 text-[12px] leading-[16px] text-white cursor-pointer flex items-center gap-1 ${
                selectedPage === "about" 
                  ? "bg-[#3F3F3F] opacity-100" 
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <File className="w-[14px] h-[14px]" strokeWidth={2} />
              About
            </div>
            <div 
              onClick={() => handlePageSelect("services")}
              className={`px-2 py-1 text-[12px] leading-[16px] text-white cursor-pointer flex items-center gap-1 ${
                selectedPage === "services" 
                  ? "bg-[#3F3F3F] opacity-100" 
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <File className="w-[14px] h-[14px]" strokeWidth={2} />
              Services
            </div>
            <div 
              onClick={() => handlePageSelect("contact")}
              className={`px-2 py-1 text-[12px] leading-[16px] text-white cursor-pointer flex items-center gap-1 ${
                selectedPage === "contact" 
                  ? "bg-[#3F3F3F] opacity-100" 
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <File className="w-[14px] h-[14px]" strokeWidth={2} />
              Contact
            </div>
          </div>
        </div>

        {/* Web Apps Section */}
        <div className="border-b border-[#454545] pb-2">
          <div 
            onClick={() => setIsWebAppsOpen(!isWebAppsOpen)}
            className="flex items-center justify-between px-2 h-[40px] text-white font-semibold text-[13px] leading-[20px] font-inter cursor-pointer"
          >
            <span>Web apps</span>
            <ChevronRight 
              className={`w-[14px] h-[14px] transition-transform ${isWebAppsOpen ? 'rotate-90' : 'rotate-0'} ${iconStyle}`}
              strokeWidth={2}
            />
          </div>
          <div className={isWebAppsOpen ? "" : "hidden"}>
            <div 
              onClick={() => handlePageSelect("doggo-training")}
              className={`px-2 py-1 text-[12px] leading-[16px] text-white cursor-pointer flex items-center gap-1 ${
                selectedPage === "doggo-training" 
                  ? "bg-[#3F3F3F] opacity-100" 
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <SquareCode className="w-[14px] h-[14px]" strokeWidth={2} />
              Doggo training web app
            </div>
          </div>
        </div>

        {/* CMS Collection Pages Section */}
        <div className="border-b border-[#454545] pb-2">
          <div 
            onClick={() => setIsCmsOpen(!isCmsOpen)}
            className="flex items-center justify-between px-2 h-[40px] text-white font-semibold text-[13px] leading-[20px] font-inter cursor-pointer"
          >
            <span>CMS Collection pages</span>
            <ChevronRight 
              className={`w-[14px] h-[14px] transition-transform ${isCmsOpen ? 'rotate-90' : 'rotate-0'} ${iconStyle}`}
              strokeWidth={2}
            />
          </div>
          <div className={isCmsOpen ? "" : "hidden"}>
            <div className="px-2 py-1 text-[12px] leading-[16px] text-[#C4AFFF] opacity-80 hover:opacity-100 cursor-pointer flex items-center gap-1">
              <File className="w-[14px] h-[14px]" strokeWidth={2} />
              Blog Posts
            </div>
            <div className="px-2 py-1 text-[12px] leading-[16px] text-[#C4AFFF] opacity-80 hover:opacity-100 cursor-pointer flex items-center gap-1">
              <File className="w-[14px] h-[14px]" strokeWidth={2} />
              Products
            </div>
          </div>
        </div>

        {/* Utility Pages Section */}
        <div className="border-b border-[#454545] pb-2">
          <div 
            onClick={() => setIsUtilityOpen(!isUtilityOpen)}
            className="flex items-center justify-between px-2 h-[40px] text-white font-semibold text-[13px] leading-[20px] font-inter cursor-pointer"
          >
            <span>Utility pages</span>
            <ChevronRight 
              className={`w-[14px] h-[14px] transition-transform ${isUtilityOpen ? 'rotate-90' : 'rotate-0'} ${iconStyle}`}
              strokeWidth={2}
            />
          </div>
          <div className={isUtilityOpen ? "" : "hidden"}>
            <div className="px-2 py-1 text-[12px] leading-[16px] text-white opacity-80 hover:opacity-100 cursor-pointer flex items-center gap-1">
              <File className="w-[14px] h-[14px]" strokeWidth={2} />
              404 Not Found
            </div>
            <div className="px-2 py-1 text-[12px] leading-[16px] text-white opacity-80 hover:opacity-100 cursor-pointer flex items-center gap-1">
              <File className="w-[14px] h-[14px]" strokeWidth={2} />
              Password Protected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 