"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: React.RefObject<HTMLElement | HTMLDivElement>;
  children: React.ReactNode;
  className?: string;
}

const Menu = ({ isOpen, onClose, trigger, children, className = "" }: MenuProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  // Calculate position based on trigger element
  useEffect(() => {
    if (isOpen && trigger.current) {
      const rect = trigger.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
  }, [isOpen, trigger]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        trigger.current && 
        !trigger.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, trigger]);

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Use portal to render menu at the root level to avoid z-index issues
  return createPortal(
    <div 
      ref={menuRef}
      className="absolute z-50"
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px`,
      }}
    >
      <div className={`shadow-[var(--shadow-menu-elevated)] rounded-[4px] m-0.5`}>
        <div className={`bg-[var(--bg-tertiary)] min-w-[200px] rounded-[4px] border-0 overflow-hidden py-1 ${className}`}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Menu; 