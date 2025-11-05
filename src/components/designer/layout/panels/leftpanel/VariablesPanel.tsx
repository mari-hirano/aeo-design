"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { Row } from '@/components/spring-ui/row';
import ColorsPanel from './ColorsPanel';

const VariablesPanel: React.FC = () => {
  const [isColorsPanelOpen, setIsColorsPanelOpen] = useState(false);

  const collections = [
    { id: 'color', label: 'Color' },
  ];

  const handleCollectionClick = (e: React.MouseEvent, collectionId: string) => {
    e.stopPropagation();
    if (collectionId === 'color') {
      setIsColorsPanelOpen(true);
    }
  };


  return (
    <>
      <div className="flex flex-col h-full px-2">
        <div className="flex-1 overflow-y-auto">
          {collections.map((collection) => {
            const isSelected = isColorsPanelOpen && collection.id === 'color';
            return (
              <Row
                key={collection.id}
                label={collection.label}
                size="compact"
                selected={isSelected}
                showChevron={isSelected}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCollectionClick(e, collection.id);
                }}
                className="cursor-pointer"
              />
            );
          })}
        </div>
      </div>

      {isColorsPanelOpen && typeof window !== 'undefined' && createPortal(
        <ColorsPanel onClose={() => setIsColorsPanelOpen(false)} />,
        document.body
      )}
    </>
  );
};

export default VariablesPanel;

