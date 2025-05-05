"use client";

import React from 'react';

interface PanelHeaderProps {
  title: string;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ title }) => {
  return (
    <div className="p-3 border-b border-border flex items-center justify-between">
      <h2 className="title-text">{title}</h2>
    </div>
  );
};

export default PanelHeader; 