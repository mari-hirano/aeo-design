"use client"

import Link from "next/link"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Code, Database, LineChart, ArrowLeft, SquareCode } from "lucide-react"

export function Navbar() {
  return (
    <nav className="flex h-[35px] items-center bg-[#292929] text-white border-b border-[#454545] font-inter text-[11.5px] leading-4 tracking-[-0.01em] pr-2">
      {/* Left side */}
      <div className="flex items-center">
        {/* Logo/Home */}
        <Link href="/" className="flex items-center justify-center w-[35px] h-[35px] hover:bg-[#1a1a1a] border-r border-[#454545]">
          <Image
            src="/images/webflow-logo.png"
            alt="Webflow"
            width={20}
            height={20}
            className="object-contain"
          />
        </Link>
        
        {/* Develop Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center h-6 px-2 bg-[#3a3a3a] hover:bg-[#444444] rounded-[4px] ml-2">
            <Code className="h-[16px] w-[16px] mr-1.5 opacity-70" />
            <span>Develop</span>
            <ChevronDown className="h-[16px] w-[16px] opacity-50 ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
            <DropdownMenuItem className="focus:bg-[#2a2a2a] focus:text-white text-[11.5px] leading-4 tracking-[-0.01em]">
              Designer
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#2a2a2a] focus:text-white text-[11.5px] leading-4 tracking-[-0.01em]">
              Editor
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#2a2a2a] focus:text-white text-[11.5px] leading-4 tracking-[-0.01em]">
              Assets
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#2a2a2a] focus:text-white text-[11.5px] leading-4 tracking-[-0.01em]">
              CMS Collections
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* CMS Link */}
        <Link href="/cms" className="flex items-center px-3 py-1.5 hover:bg-[#1a1a1a] rounded-md opacity-70 hover:opacity-100">
          <Database className="h-[16px] w-[16px] mr-1.5" />
          CMS
        </Link>

        {/* Insights Link */}
        <Link href="/insights" className="flex items-center px-3 py-1.5 hover:bg-[#1a1a1a] rounded-md opacity-70 hover:opacity-100">
          <LineChart className="h-[16px] w-[16px] mr-1.5" />
          Insights
        </Link>
      </div>

      {/* Center - App Name */}
      <div className="flex items-center h-6 px-2 bg-[#007DF0]/25 text-[#A7D1FF] rounded-[4px] mx-auto">
        <ArrowLeft className="h-[16px] w-[16px] mr-1.5" />
        <span>Doggo training web app</span>
        <SquareCode className="h-[16px] w-[16px] ml-1.5" />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        <button className="flex items-center h-6 px-2 border border-[#454545] text-white rounded-[4px] hover:bg-[#1a1a1a]">
          Share
        </button>
        <button className="flex items-center h-6 px-2 bg-[#444444] text-white rounded-[4px] hover:bg-[#4f4f4f]">
          <span>Deploy</span>
          <ChevronDown className="h-[16px] w-[16px] ml-1 opacity-50" />
        </button>
      </div>
    </nav>
  )
} 