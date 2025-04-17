"use client";

import { Navbar } from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import { NavigatorProvider } from "@/context/NavigatorContext";
import { FileTree } from "@/components/FileTree";
import { Preview } from "@/components/Preview";
import { MoreHorizontal, ChevronLeft, Search, ChevronRight } from "lucide-react";
import { useState, useCallback, useRef } from 'react';
import Editor from "@monaco-editor/react";

interface LayoutContentProps {
  children: React.ReactNode;
}

const fileStructure = [
  {
    id: 'src',
    name: 'src',
    type: 'folder' as const,
    children: [
      {
        id: 'app',
        name: 'app',
        type: 'folder' as const,
        children: [
          {
            id: 'page.tsx',
            name: 'page.tsx',
            type: 'file' as const,
            content: '// Home page component'
          },
          {
            id: 'layout.tsx',
            name: 'layout.tsx',
            type: 'file' as const,
            content: '// Root layout component'
          },
          {
            id: 'globals.css',
            name: 'globals.css',
            type: 'file' as const,
            content: '/* Global styles */'
          }
        ]
      },
      {
        id: 'components',
        name: 'components',
        type: 'folder' as const,
        children: [
          {
            id: 'ui',
            name: 'ui',
            type: 'folder' as const,
            children: [
              {
                id: 'button.tsx',
                name: 'button.tsx',
                type: 'file' as const,
                content: '// Button component'
              },
              {
                id: 'card.tsx',
                name: 'card.tsx',
                type: 'file' as const,
                content: '// Card component'
              },
              {
                id: 'input.tsx',
                name: 'input.tsx',
                type: 'file' as const,
                content: '// Input component'
              }
            ]
          },
          {
            id: 'features',
            name: 'features',
            type: 'folder' as const,
            children: [
              {
                id: 'auth',
                name: 'auth',
                type: 'folder' as const,
                children: [
                  {
                    id: 'login-form.tsx',
                    name: 'login-form.tsx',
                    type: 'file' as const,
                    content: '// Login form component'
                  },
                  {
                    id: 'signup-form.tsx',
                    name: 'signup-form.tsx',
                    type: 'file' as const,
                    content: '// Signup form component'
                  }
                ]
              },
              {
                id: 'dashboard',
                name: 'dashboard',
                type: 'folder' as const,
                children: [
                  {
                    id: 'stats-card.tsx',
                    name: 'stats-card.tsx',
                    type: 'file' as const,
                    content: '// Dashboard stats component'
                  },
                  {
                    id: 'activity-feed.tsx',
                    name: 'activity-feed.tsx',
                    type: 'file' as const,
                    content: '// Activity feed component'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'lib',
        name: 'lib',
        type: 'folder' as const,
        children: [
          {
            id: 'utils.ts',
            name: 'utils.ts',
            type: 'file' as const,
            content: '// Utility functions'
          },
          {
            id: 'api.ts',
            name: 'api.ts',
            type: 'file' as const,
            content: '// API client'
          }
        ]
      }
    ]
  },
  {
    id: 'public',
    name: 'public',
    type: 'folder' as const,
    children: [
      {
        id: 'images',
        name: 'images',
        type: 'folder' as const,
        children: [
          {
            id: 'logo.svg',
            name: 'logo.svg',
            type: 'file' as const,
            content: '<!-- Logo SVG -->'
          },
          {
            id: 'hero.png',
            name: 'hero.png',
            type: 'file' as const,
            content: '// Hero image'
          }
        ]
      }
    ]
  },
  {
    id: 'package.json',
    name: 'package.json',
    type: 'file' as const,
    content: '// Package configuration'
  },
  {
    id: 'tsconfig.json',
    name: 'tsconfig.json',
    type: 'file' as const,
    content: '// TypeScript configuration'
  }
];

export function LayoutContent({ children }: LayoutContentProps) {
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [previewWidth, setPreviewWidth] = useState(0.5); // 50% of available space
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startXRef = useRef(0);
  const startHeightRef = useRef(0);
  const startWidthRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Add editor value state
  const [editorValue, setEditorValue] = useState(`interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

class UserService {
  private users: Map<string, User> = new Map();

  public async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };

    this.users.set(newUser.id, newUser);
    return newUser;
  }

  public getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  public updateUser(id: string, data: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  public deleteUser(id: string): boolean {
    return this.users.delete(id);
  }
}

// Example usage
const userService = new UserService();

async function example() {
  const user = await userService.createUser({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  });

  console.log('Created user:', user);
}`);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorValue(value);
    }
  };

  const handleVerticalMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = previewWidth;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const deltaX = e.clientX - startXRef.current;
      const deltaRatio = deltaX / containerWidth;
      const newWidth = Math.max(0.2, Math.min(0.8, startWidthRef.current - deltaRatio));
      
      setPreviewWidth(newWidth);
    };
    
    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = 'none';
  }, [previewWidth]);

  const handleHorizontalMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startHeightRef.current = terminalHeight;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      
      const currentY = e.clientY;
      const deltaY = startYRef.current - currentY;
      const newHeight = Math.max(40, Math.min(800, startHeightRef.current + deltaY));
      
      setTerminalHeight(newHeight);
    };
    
    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = 'none';
  }, [terminalHeight]);

  return (
    <NavigatorProvider>
      <div className="h-screen w-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex">
          <LeftSidebar />
          
          {/* File Tree Panel */}
          <div className="w-[248px] border-r border-[#454545] bg-[#292929]">
            {/* Navigator Header */}
            <div className="h-[40px] flex items-center justify-between px-3 border-b border-[#454545]">
              <span className="font-semibold text-[13px] leading-[20px] text-white font-inter">
                Navigator
              </span>
              <button className="w-[16px] h-[16px] flex items-center justify-center text-[#CCCCCC] hover:text-white">
                <MoreHorizontal size={16} />
              </button>
            </div>

            {/* Search Box */}
            <div className="px-3 py-2">
              <div className="flex items-center h-[24px] bg-[#3C3C3C] rounded-sm px-2">
                <Search size={12} className="text-[#CCCCCC]" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent border-none text-[#CCCCCC] text-[12px] leading-[16px] px-2 w-full focus:outline-none placeholder-[#808080]"
                />
              </div>
            </div>

            {/* File Tree */}
            <FileTree 
              items={fileStructure} 
              defaultOpenFolders={['src', 'app']}
              defaultSelectedFileId="page.tsx"
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-[#1E1E1E]">
            {/* Top Section: Code Editor and Preview */}
            <div className="flex-1 flex min-h-0" ref={containerRef}>
              {/* Code Editor */}
              <div style={{ width: `${(1 - previewWidth) * 100}%` }} className="border-r border-[#454545]">
                <div className="h-[40px] border-b border-[#454545] flex items-center px-4 bg-[#292929]">
                  <span className="text-[11.5px] leading-[13px] text-[#CCCCCC] tracking-[-0.01em] flex items-center">
                    src <ChevronRight size={12} className="mx-1 text-[#808080]" /> app <ChevronRight size={12} className="mx-1 text-[#808080]" /> page.tsx
                  </span>
                </div>
                <div className="h-[calc(100%-40px)] overflow-hidden pt-2">
                  <Editor
                    height="100%"
                    defaultLanguage="typescript"
                    defaultValue={editorValue}
                    theme="vs-dark"
                    onChange={handleEditorChange}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 11.5,
                      lineHeight: 20,
                      fontFamily: "Roboto Mono",
                      fontLigatures: true,
                      lineNumbers: "on",
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      readOnly: false,
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>

              {/* Vertical Resize Handle */}
              <div
                className="relative w-0"
              >
                <div
                  className="absolute top-0 bottom-0 left-0 w-1 cursor-col-resize bg-transparent hover:bg-[#007ACC] transition-colors"
                  onMouseDown={handleVerticalMouseDown}
                />
              </div>

              {/* Preview Panel */}
              <div style={{ width: `${previewWidth * 100}%` }} className="relative">
                <div className="h-[40px] border-b border-[#454545] flex items-center px-4 bg-[#292929]">
                  <span className="text-[11.5px] leading-[13px] text-[#CCCCCC] tracking-[-0.01em]">
                    Preview
                  </span>
                </div>
                <div className="h-[calc(100%-40px)] overflow-hidden">
                  <Preview />
                </div>
              </div>
            </div>

            {/* Bottom Section: Terminal */}
            <div 
              style={{ height: `${terminalHeight}px` }}
              className="relative border-t border-[#454545]"
            >
              {/* Horizontal Drag Handle */}
              <div
                className="absolute top-0 left-0 right-0 h-1 -translate-y-0.5 cursor-row-resize bg-transparent hover:bg-[#007ACC] transition-colors"
                onMouseDown={handleHorizontalMouseDown}
              />
              <div className="h-[40px] border-b border-[#454545] flex items-center px-4">
                <span className="text-[13px] text-white">Terminal</span>
              </div>
              <div className="h-[calc(100%-40px)] overflow-auto bg-[#1E1E1E] p-2">
                {/* Terminal content will go here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavigatorProvider>
  );
} 