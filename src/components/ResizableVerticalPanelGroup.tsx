"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { ResizeHandle } from './ResizeHandle';

interface ResizableVerticalPanelGroupProps {
  topPanel: React.ReactNode;
  bottomPanel: React.ReactNode;
  defaultTopHeight?: number;
  minTopHeight?: number;
  maxTopHeight?: number;
  className?: string;
}

export function ResizableVerticalPanelGroup({
  topPanel,
  bottomPanel,
  defaultTopHeight = 500,
  minTopHeight = 100,
  maxTopHeight = 800,
  className = ""
}: ResizableVerticalPanelGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [topHeight, setTopHeight] = useState(defaultTopHeight);
  const [isDragging, setIsDragging] = useState(false);

  const startDragging = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrag = useCallback((e: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newTopHeight = e.clientY - containerRect.top;
      const maxHeightFromContainer = containerRect.height - 100; // Ensure bottom panel has at least 100px

      if (newTopHeight >= minTopHeight && newTopHeight <= maxTopHeight && newTopHeight <= maxHeightFromContainer) {
        setTopHeight(newTopHeight);
      }
    }
  }, [isDragging, maxTopHeight, minTopHeight]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDragging);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'ns-resize';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    return () => {
      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDragging);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, onDrag, stopDragging]);

  return (
    <div ref={containerRef} className={`flex flex-col relative h-full ${className}`}>
      {/* Top Panel */}
      <div style={{ height: topHeight }} className="relative min-h-0">
        {topPanel}
        {/* Resize Handle */}
        <ResizeHandle
          orientation="horizontal"
          onMouseDown={startDragging}
          className="absolute bottom-0 left-0 right-0"
        />
      </div>
      
      {/* Bottom Panel */}
      <div className="flex-1 min-h-0">
        {bottomPanel}
      </div>
    </div>
  );
} 