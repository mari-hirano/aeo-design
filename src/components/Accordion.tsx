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
  titleClassName = "font-sans text-[13px] leading-[18px] tracking-[0px] font-semibold text-white" 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#454545]">
      <div 
        className="flex justify-between items-center cursor-default h-[40px] pl-2 pr-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className={titleClassName}>{title}</h3>
        <div className={`transform transition-transform ${isOpen ? '' : 'rotate-[-90deg]'}`}>
          <ChevronSmallDownIcon style={{ color: 'rgba(255, 255, 255, 0.67)' }} size={16} />
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