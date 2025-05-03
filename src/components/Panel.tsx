"use client";

import React from 'react';
import PanelHeader from './PanelHeader';

interface PanelProps {
  title: string;
  isOpen: boolean;
  children?: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ title, isOpen, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed left-[35px] top-[35px] h-[calc(100vh-35px)] w-[240px] bg-[#242424] border-r border-[#454545] z-10 overflow-hidden flex flex-col"
         style={{
           boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.1)',
           animation: 'panelSlideIn 0.15s ease-out forwards'
         }}>
      <PanelHeader title={title} />
      <div className="flex-1 overflow-auto p-3">
        {children || (
          <div className="text-secondary text-sm flex flex-col gap-2">
            <p>This is the {title} panel.</p>
            <p>Content for this panel will be displayed here.</p>
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes panelSlideIn {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Panel; 