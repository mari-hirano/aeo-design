"use client";

import React from 'react';

const AddPanel = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-secondary text-sm">
        Add items to your project by dragging them to the canvas.
      </div>
      
      <div className="bg-[#353535] p-3 rounded cursor-pointer hover:bg-[#404040] transition-colors">
        <div className="text-white text-sm font-medium mb-1">Section</div>
        <div className="text-secondary text-xs">Add a new section to your page</div>
      </div>
      
      <div className="bg-[#353535] p-3 rounded cursor-pointer hover:bg-[#404040] transition-colors">
        <div className="text-white text-sm font-medium mb-1">Container</div>
        <div className="text-secondary text-xs">Add a container element</div>
      </div>
      
      <div className="bg-[#353535] p-3 rounded cursor-pointer hover:bg-[#404040] transition-colors">
        <div className="text-white text-sm font-medium mb-1">Heading</div>
        <div className="text-secondary text-xs">Add a heading element</div>
      </div>
      
      <div className="bg-[#353535] p-3 rounded cursor-pointer hover:bg-[#404040] transition-colors">
        <div className="text-white text-sm font-medium mb-1">Paragraph</div>
        <div className="text-secondary text-xs">Add a text paragraph</div>
      </div>
      
      <div className="bg-[#353535] p-3 rounded cursor-pointer hover:bg-[#404040] transition-colors">
        <div className="text-white text-sm font-medium mb-1">Button</div>
        <div className="text-secondary text-xs">Add an interactive button</div>
      </div>
    </div>
  );
};

export default AddPanel; 