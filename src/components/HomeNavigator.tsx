"use client";

import React, { useState } from 'react';
import { File, FolderOpen, ChevronRight, PanelTop, CodeXml, SquareCode } from 'lucide-react';

export function HomeNavigator() {
  const [openFolders, setOpenFolders] = useState(new Set(['Site', 'Home']));

  const toggleFolder = (folderName: string) => {
    setOpenFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderName)) {
        newSet.delete(folderName);
      } else {
        newSet.add(folderName);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col min-h-0 bg-[#292929]">
      {/* Header */}
      <div className="h-[40px] flex-none flex items-center justify-between px-2 border-b border-[#454545]">
        <span className="font-semibold text-[13px] leading-[20px] text-white font-inter whitespace-nowrap">
          Home Page Files
        </span>
      </div>

      {/* File Structure */}
      <div className="flex-1 overflow-auto pt-2">
        {/* Site folder */}
        <div 
          className="flex items-center h-6 text-[11.5px] leading-4 tracking-[-0.01em] font-inter text-white cursor-pointer hover:bg-[#383838]"
          onClick={() => toggleFolder('Site')}
        >
          <div className="flex items-center pl-2">
            <ChevronRight 
              className={`w-3.5 h-3.5 text-[#b8b8b8] mr-0.5 transition-transform ${openFolders.has('Site') ? 'rotate-90' : ''}`} 
              strokeWidth={2} 
            />
            {openFolders.has('Site') ? (
              <PanelTop className="w-3.5 h-3.5 text-[#b8b8b8] mr-1.5" strokeWidth={2} />
            ) : (
              <PanelTop className="w-3.5 h-3.5 text-[#b8b8b8] mr-1.5" strokeWidth={2} />
            )}
            <span>Site</span>
          </div>
        </div>

        {/* Site files */}
        {openFolders.has('Site') && (
          <div>
            <div className="flex items-center h-6 text-[11.5px] leading-4 tracking-[-0.01em] font-inter text-white hover:bg-[#383838]">
              <div className="flex items-center pl-[36px]">
                <CodeXml className="w-3.5 h-3.5 text-[#b8b8b8] mr-1.5" strokeWidth={2} />
                <span>Header</span>
              </div>
            </div>
            <div className="flex items-center h-6 text-[11.5px] leading-4 tracking-[-0.01em] font-inter text-white hover:bg-[#383838]">
              <div className="flex items-center pl-[36px]">
                <CodeXml className="w-3.5 h-3.5 text-[#b8b8b8] mr-1.5" strokeWidth={2} />
                <span>Footer</span>
              </div>
            </div>
          </div>
        )}

        {/* Home folder */}
        <div 
          className="flex items-center h-6 text-[11.5px] leading-4 tracking-[-0.01em] font-inter text-white cursor-pointer hover:bg-[#383838] mt-2"
          onClick={() => toggleFolder('Home')}
        >
          <div className="flex items-center pl-2">
            <ChevronRight 
              className={`w-3.5 h-3.5 text-[#b8b8b8] mr-0.5 transition-transform ${openFolders.has('Home') ? 'rotate-90' : ''}`} 
              strokeWidth={2} 
            />
            {openFolders.has('Home') ? (
              <File className="w-3.5 h-3.5 text-[#b8b8b8] mr-1.5" strokeWidth={2} />
            ) : (
              <File className="w-3.5 h-3.5 text-[#b8b8b8] mr-1.5" strokeWidth={2} />
            )}
            <span>Home</span>
          </div>
        </div>

        {/* Files */}
        {openFolders.has('Home') && (
          <div>
            <div className="flex items-center h-6 text-[11.5px] leading-4 tracking-[-0.01em] font-inter text-white bg-[#383838]">
              <div className="flex items-center pl-[36px]">
                <CodeXml className="w-3.5 h-3.5 text-[#b8b8b8] mr-1.5" strokeWidth={2} />
                <span>Header</span>
              </div>
            </div>
            <div className="flex items-center h-6 text-[11.5px] leading-4 tracking-[-0.01em] font-inter text-white hover:bg-[#383838]">
              <div className="flex items-center pl-[36px]">
                <SquareCode className="w-3.5 h-3.5 text-[#b8b8b8] mr-1.5" strokeWidth={2} />
                <span>Embed</span>
              </div>
            </div>
            <div className="flex items-center h-6 text-[11.5px] leading-4 tracking-[-0.01em] font-inter text-white hover:bg-[#383838]">
              <div className="flex items-center pl-[36px]">
                <SquareCode className="w-3.5 h-3.5 text-[#b8b8b8] mr-1.5" strokeWidth={2} />
                <span>Custom embed</span>
              </div>
            </div>
            <div className="flex items-center h-6 text-[11.5px] leading-4 tracking-[-0.01em] font-inter text-white hover:bg-[#383838]">
              <div className="flex items-center pl-[36px]">
                <SquareCode className="w-3.5 h-3.5 text-[#b8b8b8] mr-1.5" strokeWidth={2} />
                <span>Code component</span>
              </div>
            </div>
            <div className="flex items-center h-6 text-[11.5px] leading-4 tracking-[-0.01em] font-inter text-white hover:bg-[#383838]">
              <div className="flex items-center pl-[36px]">
                <CodeXml className="w-3.5 h-3.5 text-[#b8b8b8] mr-1.5" strokeWidth={2} />
                <span>Footer</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 