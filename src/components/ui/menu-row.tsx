"use client";

import React from 'react';
import { Checkbox } from './checkbox';
import { CheckDefaultIcon } from '@/icons/CheckDefaultIcon';

export interface MenuRowProps {
  label?: string;
  secondaryText?: string;
  shortcutText?: string;
  icon?: React.ReactNode;
  showCheckbox?: boolean;
  isChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  divider?: boolean;
}

const MenuRow = ({
  label,
  secondaryText,
  shortcutText,
  icon,
  showCheckbox = false,
  isChecked = false,
  onCheckedChange,
  onClick,
  disabled = false,
  className = "",
  divider = false
}: MenuRowProps) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleCheckboxChange: (checked: boolean) => void = (checked: boolean) => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(checked);
    }
  };

  // If it's a divider, render just a line
  if (divider) {
    return <div className="h-[1px] bg-[var(--border-default)] my-1"></div>;
  }

  if (!label) {
    console.warn('MenuRow requires a label when not used as a divider');
    return null;
  }

  return (
    <div
      className={`flex items-center py-1 px-2 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[var(--bg-raised)] cursor-pointer'
      } ${className}`}
      onClick={handleClick}
    >
      {/* Left side with icon or checkbox */}
      <div className="w-[16px] h-[16px] flex items-center text-[var(--text-secondary)] justify-center shrink-0 mr-[4px]">
        {showCheckbox && (
          isChecked ? (
            <CheckDefaultIcon 
              size={16} 
              onClick={(e) => {
                e.stopPropagation();
                handleCheckboxChange(false);
              }}
            />
          ) : (
            <div 
              className="w-4 h-4 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleCheckboxChange(true);
              }}
            />
          )
        )}
        {!showCheckbox && icon && <div className="flex items-center justify-center">{icon}</div>}
      </div>

      {/* Center content */}
      <div className="flex-1 min-w-0">
        <div className="body-text">{label}</div>
        {secondaryText && (
          <div className="body-text text-[var(--text-secondary)]">{secondaryText}</div>
        )}
      </div>

      {/* Right side with shortcut text */}
      {shortcutText && (
        <div className="ml-4 body-text text-[var(--text-secondary)] whitespace-nowrap">
          {shortcutText}
        </div>
      )}
    </div>
  );
};

export default MenuRow; 