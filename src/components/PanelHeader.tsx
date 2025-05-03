"use client";

import React from 'react';

interface PanelHeaderProps {
  title: string;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ title }) => {
  return (
    <div className="p-3 border-b border-[#454545] flex items-center justify-between">
      <h2 className="text-white text-sm font-medium">{title}</h2>
    </div>
  );
};

export default PanelHeader; 