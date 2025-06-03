"use client";

import React from 'react';

const InteractionsTabContent: React.FC = () => {
  return (
    <div className="p-4">
      <h3 className="text-sm text-white/80 mb-3">Element Interactions</h3>
      
      <div className="space-y-4 text-white/70 text-xs">
        <div className="flex flex-col gap-2">
          <p className="text-white/50 text-xs">Create interactions for this element to respond to events like clicks, mouse movements, and scroll positions.</p>
          
          <button className="bg-[#333333] text-white/70 text-xs py-1 px-2 rounded-sm border border-white/10 hover:bg-[#3a3a3a] mt-2">
            + Add Element Trigger
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <h4 className="text-sm text-white/80 mb-2">Page Load Actions</h4>
          <p className="text-white/50 text-xs">Add animations or effects that occur when the page loads.</p>
          
          <button className="bg-[#333333] text-white/70 text-xs py-1 px-2 rounded-sm border border-white/10 hover:bg-[#3a3a3a] mt-2">
            + Add Page Load Animation
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <h4 className="text-sm text-white/80 mb-2">Scroll Effects</h4>
          <p className="text-white/50 text-xs">Create effects based on scroll position.</p>
          
          <button className="bg-[#333333] text-white/70 text-xs py-1 px-2 rounded-sm border border-white/10 hover:bg-[#3a3a3a] mt-2">
            + Add Scroll Effect
          </button>
        </div>
      </div>
    </div>
  );
};

export default InteractionsTabContent; 