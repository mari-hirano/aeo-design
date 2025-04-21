"use client";

import React from 'react';
import { Folder, FolderOpen, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileTreeItemProps {
  name: string;
  type: 'file' | 'folder';
  level: number;
  isOpen?: boolean;
  isSelected?: boolean;
  onToggle?: () => void;
  onSelect?: () => void;
}

export function FileTreeItem({
  name,
  type,
  level,
  isOpen = false,
  isSelected = false,
  onToggle,
  onSelect
}: FileTreeItemProps) {
  const isFolder = type === 'folder';
  
  return (
    <div
      className={cn(
        "flex items-center h-6 px-2 cursor-pointer text-[11.5px] leading-4 tracking-[-0.01em] font-inter",
        isSelected && "bg-[#383838]",
        !isSelected && "hover:bg-[#383838]"
      )}
      style={{ paddingLeft: `${(level * 12) + 8}px` }}
      onClick={isFolder ? onToggle : onSelect}
    >
      {isFolder ? (
        isOpen ? (
          <FolderOpen className="w-[14px] h-[14px] text-[#b8b8b8] mr-1.5" strokeWidth={2} />
        ) : (
          <Folder className="w-[14px] h-[14px] text-[#b8b8b8] mr-1.5" strokeWidth={2} />
        )
      ) : (
        <FileCode className="w-[14px] h-[14px] text-[#b8b8b8] mr-1.5" strokeWidth={2} />
      )}
      <span className={cn(
        "text-white",
        isSelected ? "opacity-100" : "opacity-80"
      )}>
        {name}
      </span>
    </div>
  );
} 