"use client";

import React from 'react';

const PagesPanel = () => {
  const pages = [
    { name: 'Home', path: '/', active: true },
    { name: 'About', path: '/about', active: false },
    { name: 'Services', path: '/services', active: false },
    { name: 'Contact', path: '/contact', active: false },
    { name: 'Blog', path: '/blog', active: false },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between py-2">
        <div className="text-white text-sm font-medium">Pages</div>
        <button className="bg-[#353535] hover:bg-[#404040] transition-colors rounded-sm p-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="mt-2">
        {pages.map((page, index) => (
          <div 
            key={index}
            className={`py-2 px-3 rounded flex items-center text-sm cursor-pointer ${page.active ? 'bg-blue-600' : 'hover:bg-[#353535]'}`}
          >
            <div className={`${page.active ? 'text-white' : 'text-secondary'} flex-1`}>
              {page.name}
            </div>
            <div className="text-xs text-[#666666]">{page.path}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagesPanel; 