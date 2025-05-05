"use client";

import React from 'react';

interface PanelHeaderProps {
  title: string;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ title }) => {
  return (
    <div className="px-2 py-3 flex items-center justify-between">
      <h2 className="title-semibold">{title}</h2>
    </div>
  );
};

export default PanelHeader; 