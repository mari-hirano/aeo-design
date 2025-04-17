"use client";

interface ResizeHandleProps {
  orientation: 'horizontal' | 'vertical';
  onMouseDown: (e: React.MouseEvent) => void;
  className?: string;
}

export function ResizeHandle({ orientation, onMouseDown, className = '' }: ResizeHandleProps) {
  const isHorizontal = orientation === 'horizontal';
  
  return (
    <div
      className={`absolute ${isHorizontal ? 'h-1 left-0 right-0' : 'w-1 top-0 bottom-0 right-0'} 
        bg-gray-700 hover:bg-gray-600 
        ${isHorizontal ? 'cursor-ns-resize' : 'cursor-ew-resize'} 
        z-10 ${className}`}
      onMouseDown={onMouseDown}
    />
  );
} 