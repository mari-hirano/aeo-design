"use client";

import React, { useRef, useEffect } from 'react';
import PanelHeader from './PanelHeader';

interface PanelProps {
  title: string;
  isOpen: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
  customHeader?: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ title, isOpen, children, onClose, customHeader }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // If click is within the panel header (where Select is), don't close
      if (headerRef.current && headerRef.current.contains(target)) {
        return;
      }
      
      // Always check if the click is on Select-related elements
      if (target.closest('[data-radix-select-trigger]') || 
          target.closest('[data-radix-select-content]') ||
          target.closest('[role="combobox"]') ||
          target.closest('button[data-state]') ||
          target.closest('[role="listbox"]') ||
          target.closest('[data-radix-select-viewport]') ||
          target.closest('[data-radix-popper-content-wrapper]')) {
        return;
      }
      
      // Check if the click was on a Radix Select portal (dropdown menu)
      const radixPortal = document.querySelector('[data-radix-portal]');
      const radixSelectContent = document.querySelector('[data-radix-select-content], [data-radix-popper-content-wrapper]');
      
      if (radixPortal && radixPortal.contains(target)) {
        return;
      }
      
      if (radixSelectContent && radixSelectContent.contains(target)) {
        return;
      }
      
      // Check if a Select dropdown is currently open
      const selectTrigger = document.querySelector('[data-radix-select-trigger][data-state="open"]');
      if (selectTrigger) {
        return;
      }
      
      // Now check if the click was outside the panel
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        // Check if the click was on the sidebar (we don't want to close if clicking on the sidebar)
        const leftSidebar = document.querySelector('.left-sidebar');
        if (leftSidebar && leftSidebar.contains(event.target as Node)) {
          return;
        }
        
        if (onClose) {
          onClose();
        }
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      ref={panelRef}
      className="fixed left-10 top-10 h-[calc(100vh-35px)] w-[248px] bg-[var(--bg-primary)] border-r border-[var(--border-default)] z-10 overflow-hidden flex flex-col"
      style={{
        boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.1)',
        animation: 'panelSlideIn 0.15s ease-out forwards'
      }}
    >
      <div ref={headerRef}>
        {customHeader || <PanelHeader title={title} onClose={onClose} />}
      </div>
      <div className="flex-1 panel-content-wrapper">
        <div className="flex-1 w-full panel-content">
          {children || (
            <div className="text-[var(--text-secondary)] body-text flex flex-col gap-2">
              <p>This is the {title} panel.</p>
              <p>Content for this panel will be displayed here.</p>
            </div>
          )}
        </div>
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
        
        /* Custom scrollbar styles with absolute positioning */
        .panel-content-wrapper {
          position: relative;
          overflow: hidden;
        }
        
        .panel-content {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          overflow-y: scroll;
          overflow-x: hidden;
        }
        
        /* Custom scrollbar styling */
        .panel-content::-webkit-scrollbar {
          width: 8px;
          background-color: transparent;
          position: absolute;
          right: 0;
        }
        
        .panel-content::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 0px;
          transition: background-color 0.2s ease;
        }
        
        .panel-content:hover::-webkit-scrollbar-thumb {
          background-color: rgba(69, 69, 69, 0.7);
        }
        
        .panel-content::-webkit-scrollbar-track {
          background-color: transparent;
        }
        
        /* For Firefox */
        .panel-content {
          scrollbar-width: none; /* Hide the default scrollbar */
        }
        
        /* Add a custom scrollbar for Firefox that doesn't affect layout */
        @-moz-document url-prefix() {
          .panel-content-wrapper:hover::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 8px;
            height: 100%;
            background-color: rgba(69, 69, 69, 0.7);
            z-index: 100;
            opacity: 0.7;
            border-radius: 0px;
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Panel; 