"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigator } from '@/context/NavigatorContext';

interface FileNode {
  id: string;
  name: string;
  content: string;
  children?: FileNode[];
}

export function Navigator() {
  const { setSelectedFile } = useNavigator();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const fileStructure: FileNode[] = [
    {
      id: '1',
      name: 'src',
      content: '',
      children: [
        {
          id: '2',
          name: 'components',
          content: '',
          children: [
            {
              id: '3',
              name: 'CodeEditor.tsx',
              content: '// Code editor component',
            },
            {
              id: '4',
              name: 'Navigator.tsx',
              content: '// Navigator component',
            },
          ],
        },
        {
          id: '5',
          name: 'app',
          content: '',
          children: [
            {
              id: '6',
              name: 'layout.tsx',
              content: '// App layout',
            },
            {
              id: '7',
              name: 'page.tsx',
              content: '// App page',
            },
          ],
        },
      ],
    },
    {
      id: '8',
      name: 'package.json',
      content: '{\n  "name": "orion",\n  "version": "0.1.0"\n}',
    },
  ];

  const toggleNode = (nodeId: string) => {
    const newExpandedNodes = new Set(expandedNodes);
    if (expandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId);
    } else {
      newExpandedNodes.add(nodeId);
    }
    setExpandedNodes(newExpandedNodes);
  };

  const renderNode = (node: FileNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);

    return (
      <div key={node.id}>
        <div
          className={cn(
            'flex items-center gap-1 py-1 px-2 hover:bg-white/5 cursor-pointer text-sm',
            { 'pl-4': level > 0 }
          )}
          style={{ paddingLeft: `${level * 12}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id);
            } else {
              setSelectedFile(node);
            }
          }}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-[14px] h-[14px]" strokeWidth={2} />
            ) : (
              <ChevronRight className="w-[14px] h-[14px]" strokeWidth={2} />
            )
          ) : (
            <File className="w-[14px] h-[14px]" strokeWidth={2} />
          )}
          <span>{node.name}</span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-[#1E1E1E] text-white overflow-auto">
      {fileStructure.map((node) => renderNode(node))}
    </div>
  );
} 