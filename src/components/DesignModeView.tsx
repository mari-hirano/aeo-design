"use client";

import React from 'react';
import { Square, Type, Image as ImageIcon, Layout } from 'lucide-react';

export function DesignModeView() {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#1E1E1E] text-white">
      {/* Design Mode Toolbar */}
      <div className="h-[40px] flex items-center px-4 border-b border-[#454545] bg-[#292929]">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-[#3a3a3a]">
            <Square className="w-4 h-4" />
            <span className="text-sm">Rectangle</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-[#3a3a3a]">
            <Type className="w-4 h-4" />
            <span className="text-sm">Text</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-[#3a3a3a]">
            <ImageIcon className="w-4 h-4" />
            <span className="text-sm">Image</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-[#3a3a3a]">
            <Layout className="w-4 h-4" />
            <span className="text-sm">Section</span>
          </button>
        </div>
      </div>

      {/* Design Canvas */}
      <div className="flex-1 overflow-auto p-8 flex justify-center">
        <div className="w-full max-w-[1200px] min-h-full bg-white rounded-lg shadow-lg">
          {/* Design canvas content will go here */}
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            Design Canvas
          </div>
        </div>
      </div>
    </div>
  );
} 