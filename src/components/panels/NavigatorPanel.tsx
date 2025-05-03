"use client";

import React, { useState } from 'react';

const NavigatorPanel = () => {
  const [expanded, setExpanded] = useState<string[]>(['body', 'header', 'main']);

  const toggleExpand = (id: string) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter(item => item !== id));
    } else {
      setExpanded([...expanded, id]);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="text-white text-sm font-medium">Elements</div>
        <div className="flex gap-1">
          <button className="bg-[#353535] hover:bg-[#404040] p-1 rounded">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 14L12 7L5 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="bg-[#353535] hover:bg-[#404040] p-1 rounded">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10L12 17L19 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="text-sm">
        <div className="py-1 pl-2 text-secondary hover:bg-[#353535] rounded cursor-pointer flex items-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          </svg>
          html
        </div>
        
        <div className="ml-3">
          <div className="py-1 pl-2 text-secondary hover:bg-[#353535] rounded cursor-pointer flex items-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            head
          </div>
          
          <div onClick={() => toggleExpand('body')} className="py-1 pl-2 text-secondary hover:bg-[#353535] rounded cursor-pointer flex items-center">
            {expanded.includes('body') ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            body
          </div>
          
          {expanded.includes('body') && (
            <div className="ml-3">
              <div onClick={() => toggleExpand('header')} className="py-1 pl-2 text-white hover:bg-[#353535] rounded cursor-pointer flex items-center">
                {expanded.includes('header') ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                header
              </div>
              
              {expanded.includes('header') && (
                <div className="ml-3">
                  <div className="py-1 pl-2 text-secondary hover:bg-[#353535] rounded cursor-pointer flex items-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    nav
                  </div>
                  <div className="py-1 pl-2 text-secondary hover:bg-[#353535] rounded cursor-pointer flex items-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    div.logo
                  </div>
                </div>
              )}
              
              <div onClick={() => toggleExpand('main')} className="py-1 pl-2 text-white hover:bg-[#353535] rounded cursor-pointer flex items-center">
                {expanded.includes('main') ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                main
              </div>
              
              {expanded.includes('main') && (
                <div className="ml-3">
                  <div className="py-1 pl-2 text-secondary hover:bg-[#353535] rounded cursor-pointer flex items-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    h1
                  </div>
                  <div className="py-1 pl-2 text-secondary hover:bg-[#353535] rounded cursor-pointer flex items-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    p
                  </div>
                  <div className="py-1 pl-2 text-secondary hover:bg-[#353535] rounded cursor-pointer flex items-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    button.cta
                  </div>
                </div>
              )}
              
              <div className="py-1 pl-2 text-secondary hover:bg-[#353535] rounded cursor-pointer flex items-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                </svg>
                footer
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigatorPanel; 