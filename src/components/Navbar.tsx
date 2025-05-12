"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { SquareMousePointer, Check } from "lucide-react"
import { useMode } from "@/context/ModeContext"
import { getImagePath } from "@/lib/utils"
import { 
  OptimizeIcon, 
  LocalizationIcon, 
  DesktopBreakpointIcon, 
  PageDefaultIcon, 
  CommentIcon, 
  ChevronSmallDownIcon, 
  CheckDefaultIcon,
  MenuIcon,
  UndoIcon,
  RedoIcon,
  SettingsIcon,
  DashboardIcon,
  EditIcon,
  CMSSearchIcon,
  CodeIcon,
  HelpCircleIcon,
  HelpShortcutsIcon,
  SearchDefaultIcon,
  CssPreviewIcon,
  BrushIcon
} from "@/icons"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { mode, setMode } = useMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const router = useRouter();

  return (
    <nav className="flex h-[35px] items-center bg-[#292929] text-white border-b border-[#454545] font-sans text-[11.5px] leading-4 tracking-[-0.01em] pr-2">
      {/* Left side */}
      <div className="flex items-center">
        {/* Logo/Home with Menu Dropdown */}
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div 
              className="flex items-center justify-center w-[35px] h-[35px] hover:bg-[#1a1a1a] border-r border-[#454545] cursor-pointer"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              {menuOpen || logoHovered ? (
                <MenuIcon size={20} className="text-white" />
              ) : (
                <Image
                  src={getImagePath("/images/WebflowLogo.png")}
                  alt="Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[220px]">
            <DropdownMenuItem onClick={() => setMenuOpen(false)}>
              <DashboardIcon size={16} className="mr-[4px]" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMenuOpen(false)}>
              <SettingsIcon size={16} className="mr-[4px]" />
              Site settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMenuOpen(false)}>
              <EditIcon size={16} className="mr-[4px]" />
              Editor
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setMenuOpen(false)}>
              <SearchDefaultIcon size={16} className="mr-[4px]" />
              Quick find
              <DropdownMenuShortcut className="ml-auto">⌘E/⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setMenuOpen(false)}>
              <UndoIcon size={16} className="mr-[4px]" />
              Undo
              <DropdownMenuShortcut className="ml-auto">⌘Z</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMenuOpen(false)}>
              <RedoIcon size={16} className="mr-[4px]" />
              Redo
              <DropdownMenuShortcut className="ml-auto">⌘⇧Z</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setMenuOpen(false)}>
              <CodeIcon size={16} className="mr-[4px]" />
              Export code
              <DropdownMenuShortcut className="ml-auto">⇧E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setMenuOpen(false)}>
              <HelpShortcutsIcon size={16} className="mr-[4px]" />
              Keyboard shortcuts
              <DropdownMenuShortcut className="ml-auto">⇧?</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMenuOpen(false)}>
              <CssPreviewIcon size={16} className="mr-[4px]" />
              CSS preview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setMenuOpen(false)}>
              <HelpCircleIcon size={16} className="mr-[4px]" />
              Help & feedback
              <DropdownMenuShortcut className="ml-auto">⌃⇧/</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => {
                setMenuOpen(false);
                router.push("/style-guide");
              }}
            >
              <BrushIcon size={16} className="mr-[4px]" />
              Spring Design System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Mode Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center h-6 px-2 bg-[#3a3a3a] hover:bg-[#444444] rounded-[4px] ml-2 text-[11.5px] leading-4 focus:outline-none">
            <SquareMousePointer className="w-[14px] h-[14px] mr-1.5 opacity-70" strokeWidth={2} />
            <span>{mode}</span>
            <ChevronSmallDownIcon className="opacity-50 ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start"
            className="w-[280px] bg-[#404040] rounded-[4px] border-0 text-white font-sans [&_*]:text-[11.5px] [&_*]:leading-4 [&_*]:tracking-[-0.01em] [&>*]:gap-0 px-0"
          >
            <DropdownMenuItem 
              className="flex items-start py-[4px] px-[8px] focus:bg-[#4D4D4D] hover:bg-[#4D4D4D] focus:text-white cursor-pointer gap-0 rounded-none"
              onClick={() => setMode('Design')}
            >
              <div className="w-[16px] h-[16px] flex items-center justify-center shrink-0">
                {mode === 'Design' && <Check className="w-[16px] h-[16px] text-white" strokeWidth={2} />}
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
                {mode === 'Build' && <Check className="w-[16px] h-[16px] text-white" strokeWidth={2} />}
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
                {mode === 'Develop' && <Check className="w-[16px] h-[16px] text-white" strokeWidth={2} />}
              </div>
              <div className="ml-[4px]">
                <div className="text-white">Develop</div>
                <div className="text-[#c0c0c0]">View and edit custom code on your site</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Center - Controls */}
      <div className="flex items-center mx-auto">
        <Button variant="ghost" size="default" className="h-6">
          <OptimizeIcon size={16} className="opacity-70" />
          <span>Optimize</span>
        </Button>
        
        <Button variant="ghost" size="default" className="h-6 ml-1">
          <LocalizationIcon size={16} className="opacity-70" />
          <span>English</span>
        </Button>
        
        <div className="mx-2 h-4 border-r border-[#454545]"></div>
        
        <Button variant="ghost" size="default" className="h-6">
          <PageDefaultIcon size={16} className="opacity-70" />
          <span>Home</span>
          <ChevronSmallDownIcon className="opacity-70" />
        </Button>
        
        <Button variant="ghost" size="default" className="h-6 ml-1">
          <DesktopBreakpointIcon size={16} className="opacity-70" />
          <span>Desktop</span>
        </Button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        <Button variant="ghost-success" size="icon" className="h-6 w-6">
          <CheckDefaultIcon size={16} className="text-[#79E09C]" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <CommentIcon size={16} className="opacity-70" />
        </Button>
        <Button variant="outline" size="default" className="h-6">
          Share
        </Button>
        <Button variant="default" size="default" className="h-6">
          Publish
        </Button>
      </div>
    </nav>
  )
} 