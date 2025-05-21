"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { CloseDefaultIcon } from "@/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  title?: string;
  hideClose?: boolean;
  headerIcons?: React.ReactNode[];
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "primary" | "destructive" | "outline" | "subtle" | "ghost";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  leftAction?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "primary" | "destructive" | "outline" | "subtle" | "ghost";
  };
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ 
  className, 
  title,
  hideClose = false,
  headerIcons = [],
  primaryAction,
  secondaryAction,
  leftAction,
  children, 
  ...props 
}, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 w-[240px] rounded-[4px] bg-[var(--bg-primary)] p-0 shadow-lg outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {/* Popover Header (Optional) */}
      {title && (
        <div className="flex items-center justify-between px-2 py-1 border-b border-[var(--border-default)]">
          <h5 className="title-text-bold">{title}</h5>
          <div className="flex items-center gap-1">
            {headerIcons && headerIcons.length > 0 && headerIcons.map((icon, index) => (
              <div key={index} className="flex items-center justify-center h-6 w-6 rounded hover:bg-[var(--bg-tertiary-hover)] text-[var(--text-secondary)] transition-colors">
                {icon}
              </div>
            ))}
            {!hideClose && (
              <PopoverPrimitive.Close className="flex items-center justify-center h-6 w-6 rounded hover:bg-[var(--bg-tertiary-hover)] text-[var(--text-secondary)] transition-colors">
                <CloseDefaultIcon size={16} />
                <span className="sr-only">Close</span>
              </PopoverPrimitive.Close>
            )}
          </div>
        </div>
      )}

      {/* Popover Body */}
      <div className="p-2 body-text">
        {children}
      </div>

      {/* Popover Footer (Optional) */}
      {(primaryAction || secondaryAction || leftAction) && (
        <div className="flex items-center justify-between px-2 py-2 border-t border-[var(--border-default)]">
          <div>
            {leftAction && (
              <Button 
                size="sm" 
                variant={leftAction.variant || "subtle"} 
                onClick={leftAction.onClick}
              >
                {leftAction.label}
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {secondaryAction && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button 
                size="sm" 
                variant={primaryAction.variant || "primary"} 
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        </div>
      )}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent } 