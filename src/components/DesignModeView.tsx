"use client";

import React from 'react';
import { Square, Type, Image as ImageIcon, Layout } from 'lucide-react';
import Image from 'next/image';

export function DesignModeView() {
  return (
    <div className="flex-1 flex min-h-0">
      <div className="flex-1 flex flex-col min-h-0 bg-[#1E1E1E] text-white">
        {/* Design Mode Toolbar */}
        <div className="h-[40px] flex items-center justify-between border-b border-[#454545] bg-[#292929] px-2">
          <Image
            src="/orion/images/designbarleft.png"
            alt="Design Bar Left"
            width={200}
            height={24}
            priority
            className="h-[24px] w-auto"
          />
          <Image
            src="/orion/images/designbarright.png"
            alt="Design Bar Right"
            width={200}
            height={24}
            priority
            className="h-[24px] w-auto"
          />
        </div>

        {/* Design Canvas */}
        <div className="flex-1 overflow-auto flex justify-center">
          <div className="w-full max-w-[1200px] min-h-full bg-white shadow-lg">
            <div className="container mx-auto p-5">
              <h1 className="text-2xl font-bold text-gray-800 text-center">Welcome to Preview</h1>
              <div className="bg-gray-100 p-5 rounded-lg mt-5">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">Sample Content</h2>
                <p className="mb-4 text-gray-700">This is a simple preview panel showing HTML content. Later, this can be connected to display the rendered output of your code editor.</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </ul>
              </div>
              <div className="text-center mt-5 text-gray-500">
                <p>Preview Footer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Style Panel */}
      <div className="w-[240px] flex flex-col min-h-0 bg-[#292929]">
        <div className="flex-1 overflow-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-[#1E1E1E] [&::-webkit-scrollbar-thumb]:bg-[#424242] [&::-webkit-scrollbar-thumb]:hover:bg-[#4F4F4F]">
          <Image
            src="/orion/images/StylePanel.png"
            alt="Style Panel"
            width={240}
            height={800}
            priority
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
} 