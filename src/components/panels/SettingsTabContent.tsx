"use client";

import React from 'react';

const SettingsTabContent: React.FC = () => {
  return (
    <div className="p-4">
      <h3 className="text-sm text-white/80 mb-3">Element Settings</h3>
      
      <div className="space-y-4 text-white/70 text-xs">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Element ID</label>
          <input 
            type="text" 
            className="bg-[#333333] border border-white/10 rounded-sm px-2 py-1 text-white text-xs w-full"
            placeholder="element-id"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="font-medium">Responsive Display</label>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="show-mobile" className="h-3 w-3 accent-blue-500" />
            <label htmlFor="show-mobile" className="text-xs">Show on mobile</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="show-tablet" className="h-3 w-3 accent-blue-500" />
            <label htmlFor="show-tablet" className="text-xs">Show on tablet</label>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="font-medium">Attributes</label>
          <button className="bg-[#333333] text-white/70 text-xs py-1 px-2 rounded-sm border border-white/10 hover:bg-[#3a3a3a]">
            + Add Custom Attribute
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTabContent; 