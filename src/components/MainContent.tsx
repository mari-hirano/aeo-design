"use client";

import React from 'react';
import { SimpleCodeEditor } from './SimpleCodeEditor';

interface FileNode {
  id: string;
  name: string;
  content: string;
  children?: FileNode[];
}

interface MainContentProps {
  selectedFile: FileNode | null;
}

export function MainContent({ selectedFile }: MainContentProps) {
  if (!selectedFile) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-400">
        Select a file to view its content
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <SimpleCodeEditor
        content={selectedFile.content}
        language={selectedFile.name.endsWith('.tsx') ? 'typescript' : 'json'}
      />
    </div>
  );
} 