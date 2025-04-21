"use client";

import { Navbar } from "@/components/Navbar";
import LeftSidebar from "@/components/LeftSidebar";
import { NavigatorProvider, useNavigator } from "@/context/NavigatorContext";
import { PagesProvider, usePages } from "@/context/PagesContext";
import { FileTree } from "@/components/FileTree";
import { Preview } from "@/components/Preview";
import {
  MoreHorizontal,
  Search,
  ChevronRight,
  X,
  Sparkle,
  ChevronDown,
  CornerDownLeft,
  Image as ImageIcon,
  ArrowLeft,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

import Editor from "@monaco-editor/react";
import Image from "next/image";
import { Assistant } from "@/components/Assistant";
import { CodeEditor } from "@/components/CodeEditor";
import { PagesPanel } from "@/components/PagesPanel";
import { useMode } from '@/context/ModeContext';
import { useAssistant } from '@/context/AssistantContext';
import { DesignModeView } from './DesignModeView';
import { HomeNavigator } from './HomeNavigator';

interface LayoutContentProps {
  children?: React.ReactNode;
}

const fileStructure = [
  {
    id: "src",
    name: "src",
    type: "folder" as const,
    children: [
      {
        id: "app",
        name: "app",
        type: "folder" as const,
        children: [
          {
            id: "page.tsx",
            name: "page.tsx",
            type: "file" as const,
            content: "// Home page component",
          },
          {
            id: "layout.tsx",
            name: "layout.tsx",
            type: "file" as const,
            content: "// Root layout component",
          },
          {
            id: "globals.css",
            name: "globals.css",
            type: "file" as const,
            content: "/* Global styles */",
          },
        ],
      },
      {
        id: "components",
        name: "components",
        type: "folder" as const,
        children: [
          {
            id: "ui",
            name: "ui",
            type: "folder" as const,
            children: [
              {
                id: "button.tsx",
                name: "button.tsx",
                type: "file" as const,
                content: "// Button component",
              },
              {
                id: "card.tsx",
                name: "card.tsx",
                type: "file" as const,
                content: "// Card component",
              },
              {
                id: "input.tsx",
                name: "input.tsx",
                type: "file" as const,
                content: "// Input component",
              },
            ],
          },
          {
            id: "features",
            name: "features",
            type: "folder" as const,
            children: [
              {
                id: "auth",
                name: "auth",
                type: "folder" as const,
                children: [
                  {
                    id: "login-form.tsx",
                    name: "login-form.tsx",
                    type: "file" as const,
                    content: "// Login form component",
                  },
                  {
                    id: "signup-form.tsx",
                    name: "signup-form.tsx",
                    type: "file" as const,
                    content: "// Signup form component",
                  },
                ],
              },
              {
                id: "dashboard",
                name: "dashboard",
                type: "folder" as const,
                children: [
                  {
                    id: "stats-card.tsx",
                    name: "stats-card.tsx",
                    type: "file" as const,
                    content: "// Dashboard stats component",
                  },
                  {
                    id: "activity-feed.tsx",
                    name: "activity-feed.tsx",
                    type: "file" as const,
                    content: "// Activity feed component",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "lib",
        name: "lib",
        type: "folder" as const,
        children: [
          {
            id: "utils.ts",
            name: "utils.ts",
            type: "file" as const,
            content: "// Utility functions",
          },
          {
            id: "api.ts",
            name: "api.ts",
            type: "file" as const,
            content: "// API client",
          },
        ],
      },
    ],
  },
  {
    id: "public",
    name: "public",
    type: "folder" as const,
    children: [
      {
        id: "images",
        name: "images",
        type: "folder" as const,
        children: [
          {
            id: "logo.svg",
            name: "logo.svg",
            type: "file" as const,
            content: "<!-- Logo SVG -->",
          },
          {
            id: "hero.png",
            name: "hero.png",
            type: "file" as const,
            content: "// Hero image",
          },
        ],
      },
    ],
  },
  {
    id: "package.json",
    name: "package.json",
    type: "file" as const,
    content: "// Package configuration",
  },
  {
    id: "tsconfig.json",
    name: "tsconfig.json",
    type: "file" as const,
    content: "// TypeScript configuration",
  },
];

function LayoutContentInner({}: LayoutContentProps) {
  const { isNavigatorOpen } = useNavigator();
  const { isPagesOpen, selectedPage, setIsPagesOpen } = usePages();
  const { isAssistantOpen, setIsAssistantOpen } = useAssistant();
  const { mode } = useMode();
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(false);

  const getEditorContent = useCallback(() => {
    if (mode === 'Develop' && selectedPage === 'home') {
      return `import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

// Initialize smooth scrolling
const smoother = ScrollSmoother.create({
  smooth: 1,
  effects: true,
});

// Header animation setup
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.hero-header');
  const splitText = new SplitText('.hero-title', { type: 'chars, words' });
  const chars = splitText.chars;
  
  // Hero section timeline
  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      pin: true
    }
  });

  // Animate hero elements
  heroTl
    .from(chars, {
      opacity: 0,
      y: 100,
      rotateX: -90,
      stagger: 0.02,
      ease: 'back.out'
    })
    .from('.hero-subtitle', {
      opacity: 0,
      y: 50,
      duration: 1
    }, '-=0.5')
    .from('.hero-cta', {
      opacity: 0,
      y: 30,
      duration: 0.8
    }, '-=0.3');

  // Parallax background effect
  gsap.to('.hero-bg', {
    yPercent: 50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
});

// Hero section markup
const HeroSection = () => {
  return (
    <section className="hero-section min-h-screen relative overflow-hidden">
      <div className="hero-bg absolute inset-0 bg-gradient-to-b from-purple-900 to-blue-900" />
      <div className="container mx-auto px-4 h-screen flex flex-col justify-center items-center text-center relative z-10">
        <h1 className="hero-title text-7xl font-bold text-white mb-6">
          Create Something Amazing
        </h1>
        <p className="hero-subtitle text-xl text-gray-300 mb-8 max-w-2xl">
          Transform your ideas into reality with powerful animations and seamless interactions
        </p>
        <button className="hero-cta px-8 py-4 bg-white text-purple-900 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;`;
    }

    return `import { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build an app', completed: false },
    { id: 3, text: 'Ship it!', completed: false },
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-2 p-2 bg-white rounded shadow"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="h-4 w-4"
            />
            <span className={todo.completed ? 'line-through' : ''}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );`;
  }, [mode, selectedPage]);

  const [editorValue, setEditorValue] = useState(() => getEditorContent());

  useEffect(() => {
    const newContent = getEditorContent();
    if (newContent !== editorValue) {
      setEditorValue(newContent);
    }
  }, [selectedPage, mode, getEditorContent, editorValue]);

  // Add this new useEffect to handle initial page selection
  useEffect(() => {
    // Only open the panel on mode changes when not on home page
    if (mode === 'Develop' && selectedPage !== 'home') {
      // Don't reopen the panel if it was manually closed
      if (!isPagesOpen) {
        setIsPagesOpen(true);
      }
    }
  }, [mode]); // Only run when mode changes

  const handleEditorChange = (value: string | undefined) => {
    setEditorValue(value || '');
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 flex min-h-0">
        <LeftSidebar />

        {/* File Tree Panel - Only visible in Develop mode */}
        {mode === 'Develop' && (
          <div 
            className={`flex flex-col min-h-0 bg-[#292929] border-r border-[#454545] ${
              isNavigatorOpen ? "w-[248px]" : "w-0"
            } overflow-hidden`}
          >
            {selectedPage === 'home' ? (
              <HomeNavigator />
            ) : (
              <>
                {/* Navigator Header */}
                <div className="h-[40px] flex-none flex items-center justify-between px-2 border-b border-[#454545]">
                  <span className="font-semibold text-[13px] leading-[20px] text-white font-inter whitespace-nowrap">
                    Navigator
                  </span>
                  <button className="w-[16px] h-[16px] flex items-center justify-center text-[#CCCCCC] hover:text-white">
                    <MoreHorizontal size={16} />
                  </button>
                </div>

                {/* Search Box */}
                <div className="flex-none px-2 py-2">
                  <div className="flex items-center h-[24px] bg-[#212121] rounded-[4px] px-2 border border-[#464646]">
                    <Search size={12} className="text-[#CCCCCC]" />
                    <input
                      type="text"
                      placeholder="Search code"
                      className="bg-transparent border-none text-[#CCCCCC] text-[12px] leading-[16px] px-2 w-full focus:outline-none placeholder-[#808080]"
                    />
                  </div>
                </div>

                {/* File Tree */}
                <div className="flex-1 overflow-auto">
                  <FileTree
                    items={fileStructure}
                    defaultOpenFolders={["src", "app"]}
                    defaultSelectedFileId="page.tsx"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Pages Panel - Positioned absolutely */}
        <div 
          className={`absolute top-[35px] left-[35px] h-[calc(100%-35px)] z-50 bg-[#292929] ${
            isPagesOpen ? "w-[248px] border-r border-[#454545]" : "w-0"
          } overflow-hidden`}
        >
          <PagesPanel />
        </div>

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col min-h-0 bg-[#292929] overflow-hidden transition-[margin] duration-300 ease-in-out ${
            isAssistantOpen && mode !== 'Design' ? "mr-[288px]" : "mr-0"
          }`}
        >
          {mode === 'Design' ? (
            <DesignModeView />
          ) : mode === 'Develop' ? (
            <>
              {/* Top Section: Code Editor and Preview */}
              <div
                className="flex min-h-0"
                style={{
                  height: `calc(100% - ${isTerminalExpanded ? "200px" : "40px"})`,
                }}
              >
                {/* Code Editor */}
                <CodeEditor
                  isPreviewVisible={isPreviewVisible}
                  isAssistantOpen={isAssistantOpen}
                  editorValue={editorValue}
                  onEditorChange={handleEditorChange}
                  onPreviewToggle={() => setIsPreviewVisible(true)}
                  onAssistantToggle={() => setIsAssistantOpen(true)}
                />

                {/* Preview Panel */}
                <div
                  className={`flex flex-col min-h-0 transition-[width,opacity] duration-300 ${
                    isPreviewVisible ? "opacity-100 w-1/2" : "opacity-0 w-0"
                  }`}
                >
                  <div className="h-[40px] flex-none border-b border-[#454545] flex items-center justify-between pl-4 pr-2 bg-[#292929]">
                    <span className="text-[11.5px] leading-[13px] text-[#CCCCCC] tracking-[-0.01em]">
                      Preview
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPreviewVisible(false)}
                        className="flex items-center text-[#CCCCCC] hover:text-white border border-[#454545] px-2 h-6 rounded"
                      >
                        <span className="text-[11.5px]">Hide Preview</span>
                      </button>
                      {!isAssistantOpen && (
                        <button
                          onClick={() => setIsAssistantOpen(true)}
                          className="w-6 h-6 flex items-center justify-center text-[#CCCCCC] hover:text-white"
                        >
                          <Image
                            src="/images/AssistantButton.png"
                            alt="Open Assistant"
                            className="w-6 h-6"
                            width={24}
                            height={24}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <Preview />
                  </div>
                </div>
              </div>

              {/* Bottom Section: Terminal */}
              <div
                className={`flex-none border-t border-[#454545] flex flex-col min-h-0 transition-[height] duration-300 ease-in-out`}
                style={{ height: isTerminalExpanded ? "200px" : "40px" }}
              >
                <button
                  onClick={() => setIsTerminalExpanded(!isTerminalExpanded)}
                  className="h-[40px] flex-none border-b border-[#454545] flex items-center px-4 bg-[#292929]"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-[11.5px] leading-[13px] text-[#CCCCCC] tracking-[-0.01em]">
                      Terminal
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#CCCCCC] transform transition-transform duration-200 ${
                        isTerminalExpanded ? "" : "rotate-180"
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`flex-1 overflow-auto bg-[#292929] p-2 [&::-webkit-scrollbar]:w-[10px] [&::-webkit-scrollbar-track]:bg-[#1E1E1E] [&::-webkit-scrollbar-thumb]:bg-[#424242] [&::-webkit-scrollbar-thumb]:hover:bg-[#4F4F4F] ${
                    isTerminalExpanded ? "" : "hidden"
                  }`}
                >
                  <div
                    style={{
                      fontFamily:
                        '"Roboto Mono", Menlo, Monaco, "Courier New", monospace',
                    }}
                    className="text-[11.5px] leading-[20px] text-[#CCCCCC]"
                  >
                    <div className="flex">
                      <span className="text-[#4EC9B0]">➜</span>
                      <span className="text-[#569CD6]">
                        &nbsp;orion-prototype
                      </span>
                      <span className="text-[#CCCCCC]">&nbsp;git:(</span>
                      <span className="text-[#CE9178]">main</span>
                      <span className="text-[#CCCCCC]">)&nbsp;</span>
                      <span className="text-[#CCCCCC]">npm install</span>
                    </div>
                    <div className="text-[#6A9955]">
                      added 248 packages, and audited 1503 packages in 3s
                    </div>
                    <div className="text-[#6A9955]">
                      125 packages are looking for funding
                    </div>
                    <div className="text-[#6A9955]">
                      &nbsp;&nbsp;run `npm fund` for details
                    </div>
                    <div className="text-[#6A9955]">found 0 vulnerabilities</div>
                    <div className="mt-2 flex">
                      <span className="text-[#4EC9B0]">➜</span>
                      <span className="text-[#569CD6]">
                        &nbsp;orion-prototype
                      </span>
                      <span className="text-[#CCCCCC]">&nbsp;git:(</span>
                      <span className="text-[#CE9178]">main</span>
                      <span className="text-[#CCCCCC]">)&nbsp;</span>
                      <span className="text-[#CCCCCC]">npm run dev</span>
                    </div>
                    <div className="text-[#CCCCCC]">
                      {`>`} orion-prototype@0.1.0 dev
                    </div>
                    <div className="text-[#CCCCCC]">{`>`} next dev</div>
                    <div className="mt-1">
                      <span className="text-[#569CD6]">ready</span>
                      <span className="text-[#CCCCCC]">
                        {" "}
                        - started server on{" "}
                      </span>
                      <span className="text-[#CE9178]">0.0.0.0:3000</span>
                      <span className="text-[#CCCCCC]">, url: </span>
                      <span className="text-[#4EC9B0]">
                        http://localhost:3000
                      </span>
                    </div>
                    <div className="text-[#CCCCCC]">
                      event - compiled client and server successfully in 188 ms
                      (17 modules)
                    </div>
                    <div className="mt-2 flex">
                      <span className="text-[#4EC9B0]">➜</span>
                      <span className="text-[#569CD6]">
                        &nbsp;orion-prototype
                      </span>
                      <span className="text-[#CCCCCC]">&nbsp;git:(</span>
                      <span className="text-[#CE9178]">main</span>
                      <span className="text-[#CCCCCC]">)&nbsp;</span>
                      <span className="text-[#CCCCCC]">█</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-white text-lg">
              Build Mode View (Coming Soon)
            </div>
          )}
        </div>

        {mode !== 'Design' && (
          <Assistant 
            isOpen={isAssistantOpen}
            onClose={() => setIsAssistantOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export function LayoutContent(props: LayoutContentProps) {
  return (
    <NavigatorProvider>
      <PagesProvider>
        <LayoutContentInner {...props} />
      </PagesProvider>
    </NavigatorProvider>
  );
}
