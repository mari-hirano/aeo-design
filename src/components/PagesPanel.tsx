"use client";

import React, { useState } from 'react';
import { FolderPlus, FilePlus, Search, ArrowLeft, ChevronRight, File, SquareCode } from 'lucide-react';
import { usePages } from '@/context/PagesContext';

export function PagesPanel() {
  const [isStaticPagesOpen, setIsStaticPagesOpen] = useState(true);
  const [isWebAppsOpen, setIsWebAppsOpen] = useState(true);
  const [isCmsOpen, setIsCmsOpen] = useState(true);
  const [isUtilityOpen, setIsUtilityOpen] = useState(true);
  const { selectedPage, setSelectedPage, togglePages } = usePages();

  const iconStyle = "text-white opacity-[0.67] [stroke-width:1.5px]";

  const handlePageSelect = (page: string) => {
    setSelectedPage(page);
    togglePages();
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
            <FilePlus size={16} className={iconStyle} />
          </button>
          <button className="w-[16px] h-[16px] flex items-center justify-center hover:opacity-100">
            <FolderPlus size={16} className={iconStyle} />
          </button>
        </div>
      </div>

      {/* Search Box */}
      <div className="flex-none px-2 pb-2 border-b border-[#454545]">
        <div className="flex items-center h-[24px] bg-[#212121] rounded-[4px] px-2 border border-[#464646]">
          <Search size={12} className={iconStyle} />
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
              size={12} 
              className={`transition-transform ${isStaticPagesOpen ? 'rotate-90' : 'rotate-0'} ${iconStyle}`}
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
              <File size={16} className={iconStyle} />
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
              <File size={16} className={iconStyle} />
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
              <File size={16} className={iconStyle} />
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
              <File size={16} className={iconStyle} />
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
              size={12} 
              className={`transition-transform ${isWebAppsOpen ? 'rotate-90' : 'rotate-0'} ${iconStyle}`}
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
              <SquareCode size={16} className={iconStyle} />
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
              size={12} 
              className={`transition-transform ${isCmsOpen ? 'rotate-90' : 'rotate-0'} ${iconStyle}`}
            />
          </div>
          <div className={isCmsOpen ? "" : "hidden"}>
            <div className="px-2 py-1 text-[12px] leading-[16px] text-[#C4AFFF] opacity-80 hover:opacity-100 cursor-pointer flex items-center gap-1">
              <File size={16} className="text-[#C4AFFF] opacity-[0.67] [stroke-width:1.5px]" />
              Blog Posts
            </div>
            <div className="px-2 py-1 text-[12px] leading-[16px] text-[#C4AFFF] opacity-80 hover:opacity-100 cursor-pointer flex items-center gap-1">
              <File size={16} className="text-[#C4AFFF] opacity-[0.67] [stroke-width:1.5px]" />
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
              size={12} 
              className={`transition-transform ${isUtilityOpen ? 'rotate-90' : 'rotate-0'} ${iconStyle}`}
            />
          </div>
          <div className={isUtilityOpen ? "" : "hidden"}>
            <div className="px-2 py-1 text-[12px] leading-[16px] text-white opacity-80 hover:opacity-100 cursor-pointer flex items-center gap-1">
              <File size={16} className={iconStyle} />
              404 Not Found
            </div>
            <div className="px-2 py-1 text-[12px] leading-[16px] text-white opacity-80 hover:opacity-100 cursor-pointer flex items-center gap-1">
              <File size={16} className={iconStyle} />
              Password Protected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 