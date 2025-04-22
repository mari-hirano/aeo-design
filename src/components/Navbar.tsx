"use client"

import Link from "next/link"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Code, Database, LineChart, SquareCode, Check, SquareMousePointer, File } from "lucide-react"
import { useMode } from "@/context/ModeContext"
import { usePages } from "@/context/PagesContext"

export function Navbar() {
  const { mode, setMode } = useMode();
  const { selectedPage } = usePages();

  const getPageTitle = () => {
    switch (selectedPage) {
      case 'home':
        return 'Home';
      case 'about':
        return 'About';
      case 'services':
        return 'Services';
      case 'contact':
        return 'Contact';
      case 'doggo-training':
        return 'Doggo training web app';
      default:
        return 'Home';
    }
  };

  const getPageIcon = () => {
    const isHomeInDesignMode = selectedPage === 'home' && mode === 'Design';
    
    if (selectedPage === 'doggo-training') {
      return <SquareCode className="w-[14px] h-[14px] mr-1.5" strokeWidth={2} />;
    }
    if (isHomeInDesignMode) {
      return <File className="w-[14px] h-[14px] mr-1.5 opacity-[0.67]" strokeWidth={2} />;
    }
    return <File className="w-[14px] h-[14px] mr-1.5" strokeWidth={2} />;
  };

  const getTitleClasses = () => {
    const isHomeInDesignMode = selectedPage === 'home' && mode === 'Design';
    const isHomeInDevelopMode = selectedPage === 'home' && mode === 'Develop';
    if (isHomeInDesignMode || isHomeInDevelopMode) {
      return "flex items-center h-6 px-2 mx-auto text-white";
    }
    return "flex items-center h-6 px-2 bg-[#007DF0]/25 text-[#A7D1FF] rounded-[4px] mx-auto";
  };

  return (
    <nav className="flex h-[35px] items-center bg-[#292929] text-white border-b border-[#454545] font-inter text-[11.5px] leading-4 tracking-[-0.01em] pr-2">
      {/* Left side */}
      <div className="flex items-center">
        {/* Logo/Home */}
        <Link href="/" className="flex items-center justify-center w-[35px] h-[35px] hover:bg-[#1a1a1a] border-r border-[#454545]">
          <Image
            src="/orion/images/WebflowLogo.png"
            alt="Webflow"
            width={20}
            height={20}
            className="object-contain"
          />
        </Link>
        
        {/* Mode Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center h-6 px-2 bg-[#3a3a3a] hover:bg-[#444444] rounded-[4px] ml-2 text-[11.5px] leading-4 focus:outline-none">
            {mode === 'Develop' ? (
              <Code className="w-[14px] h-[14px] mr-1.5 opacity-70" strokeWidth={2} />
            ) : (
              <SquareMousePointer className="w-[14px] h-[14px] mr-1.5 opacity-70" strokeWidth={2} />
            )}
            <span>{mode}</span>
            <ChevronDown className="w-[14px] h-[14px] opacity-50 ml-1" strokeWidth={2} />
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start"
            className="w-[280px] bg-[#404040] rounded-[4px] border-0 text-white font-inter [&_*]:text-[11.5px] [&_*]:leading-4 [&_*]:tracking-[-0.01em] [&>*]:gap-0 px-0"
          >
            <DropdownMenuItem 
              className="flex items-start py-[4px] px-[8px] focus:bg-[#4D4D4D] hover:bg-[#4D4D4D] focus:text-white cursor-pointer gap-0 rounded-none"
              onClick={() => setMode('Design')}
            >
              <div className="w-[16px] h-[16px] flex items-center justify-center shrink-0">
                {mode === 'Design' && <Check className="w-[14px] h-[14px] text-white" strokeWidth={2} />}
              </div>
              <div className="ml-[4px]">
                <div className="text-white">Design</div>
                <div className="text-[#c0c0c0]">Style elements and build layouts</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-start py-[4px] px-[8px] focus:bg-[#4D4D4D] hover:bg-[#4D4D4D] focus:text-white cursor-pointer gap-0 rounded-none"
              onClick={() => setMode('Build')}
            >
              <div className="w-[16px] h-[16px] flex items-center justify-center shrink-0">
                {mode === 'Build' && <Check className="w-[14px] h-[14px] text-white" strokeWidth={2} />}
              </div>
              <div className="ml-[4px]">
                <div className="text-white">Build</div>
                <div className="text-[#c0c0c0]">Build pages with components and edit content</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex items-start py-[4px] px-[8px] focus:bg-[#4D4D4D] hover:bg-[#4D4D4D] focus:text-white cursor-pointer gap-0 rounded-none"
              onClick={() => setMode('Develop')}
            >
              <div className="w-[16px] h-[16px] flex items-center justify-center shrink-0">
                {mode === 'Develop' && <Check className="w-[14px] h-[14px] text-white" strokeWidth={2} />}
              </div>
              <div className="ml-[4px]">
                <div className="text-white">Develop</div>
                <div className="text-[#c0c0c0]">View and edit custom code on your site</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* CMS Button */}
        <button className="flex items-center px-3 py-1.5 hover:bg-[#1a1a1a] rounded-md opacity-70 hover:opacity-100">
          <Database className="w-[14px] h-[14px] mr-1.5" strokeWidth={2} />
          CMS
        </button>

        {/* Insights Button */}
        <button className="flex items-center px-3 py-1.5 hover:bg-[#1a1a1a] rounded-md opacity-70 hover:opacity-100">
          <LineChart className="w-[14px] h-[14px] mr-1.5" strokeWidth={2} />
          Insights
        </button>
      </div>

      {/* Center - App Name */}
      <div className={getTitleClasses()}>
        {getPageIcon()}
        <span>{getPageTitle()}</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        <button className="flex items-center h-6 px-2 border border-[#454545] text-white rounded-[4px] hover:bg-[#1a1a1a]">
          Share
        </button>
        <button className="flex items-center h-6 px-2 bg-[#444444] text-white rounded-[4px] hover:bg-[#4f4f4f]">
          <span>Deploy</span>
          <ChevronDown className="w-[14px] h-[14px] ml-1 opacity-50" strokeWidth={2} />
        </button>
      </div>
    </nav>
  )
} 