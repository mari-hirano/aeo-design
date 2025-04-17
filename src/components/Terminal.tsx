"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { ResizeHandle } from './ResizeHandle';

export function Terminal() {
  const [isDragging, setIsDragging] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const initialHeightRef = useRef<number>(0);
  const startYRef = useRef<number>(0);

  const startDragging = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    if (terminalRef.current) {
      initialHeightRef.current = terminalRef.current.offsetHeight;
      startYRef.current = e.clientY;
    }
    e.preventDefault();
  }, []);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrag = useCallback((e: MouseEvent) => {
    if (isDragging && terminalRef.current) {
      const deltaY = startYRef.current - e.clientY;
      const newHeight = initialHeightRef.current + deltaY;
      
      if (newHeight >= 100) { // Minimum height
        terminalRef.current.style.flexBasis = `${newHeight}px`;
      }
    }
  }, [isDragging]);

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
    <div ref={terminalRef} className="relative flex-shrink-0 flex-basis-[256px]">
      <ResizeHandle
        orientation="horizontal"
        onMouseDown={startDragging}
      />
      {/* Terminal content */}
      <div className="bg-[#1E1E1E] h-full pt-1 select-none">
        Terminal
      </div>
    </div>
  );
} 