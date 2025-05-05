"use client";

import React, { useState } from 'react';
import { ChevronSmallDownIcon } from '@/icons';

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  titleClassName?: string;
}

const Accordion: React.FC<AccordionProps> = ({ 
  title, 
  defaultOpen = true, 
  children,
  titleClassName = "title-semibold" 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border-default">
      <div 
        className="flex justify-between items-center cursor-default h-[40px] pl-2 pr-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h5 className={titleClassName}>{title}</h5>
        <div className={`transform transition-transform ${isOpen ? '' : 'rotate-[-90deg]'}`}>
          <ChevronSmallDownIcon style={{ color: 'var(--text-secondary)' }} size={16} />
        </div>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100 my-0' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion; 