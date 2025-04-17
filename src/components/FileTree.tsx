"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FileTreeItem } from "./FileTreeItem";


interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
}

interface FileTreeProps {
  items: FileNode[];
  onFileSelect?: (file: FileNode) => void;
  defaultSelectedFileId?: string;
  defaultOpenFolders?: string[];
}

export function FileTree({
  items,
  onFileSelect,
  defaultSelectedFileId,
  defaultOpenFolders,
}: FileTreeProps) {
  const [openFolders, setOpenFolders] = useState<Set<string>>(
    new Set(defaultOpenFolders || ["src"])
  );
  const [selectedFile, setSelectedFile] = useState<string | null>(
    defaultSelectedFileId || null
  );

  const toggleFolder = (folderId: string) => {
    setOpenFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const findFileById = useCallback(
    (nodes: FileNode[], id: string): FileNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findFileById(node.children, id);
          if (found) return found;
        }
      }
      return null;
    },
    []
  );

  const handleFileSelect = useCallback(
    (fileId: string) => {
      setSelectedFile(fileId);
      const file = findFileById(items, fileId);
      if (file && onFileSelect) {
        onFileSelect(file);
      }
    },
    [items, onFileSelect, findFileById]
  );

  useEffect(() => {
    if (defaultSelectedFileId) {
      handleFileSelect(defaultSelectedFileId);
    }
  }, [defaultSelectedFileId, handleFileSelect]);

  const renderItems = (nodes: FileNode[], level: number = 0) => {
    return nodes.map((node) => (
      <React.Fragment key={node.id}>
        <FileTreeItem
          name={node.name}
          type={node.type}
          level={level}
          isOpen={node.type === "folder" && openFolders.has(node.id)}
          isSelected={node.type === "file" && selectedFile === node.id}
          onToggle={() => node.type === "folder" && toggleFolder(node.id)}
          onSelect={() => node.type === "file" && handleFileSelect(node.id)}
        />
        {node.type === "folder" &&
          openFolders.has(node.id) &&
          node.children &&
          renderItems(node.children, level + 1)}
      </React.Fragment>
    ));
  };

  return <div className="py-1">{renderItems(items)}</div>;
}
