"use client";

import React from 'react';
import { CloseDefaultIcon } from '@/icons';

interface PanelHeaderProps {
  title: string;
  onClose?: () => void;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="px-2 py-3 flex items-center justify-between">
      <h2 className="title-text-bold">{title}</h2>
      {onClose && (
        <button 
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center hover:bg-[var(--bg-tertiary)] rounded-sm"
        >
          <CloseDefaultIcon size={16} className="text-[var(--text-secondary)]" />
        </button>
      )}
    </div>
  );
};

export default PanelHeader; 