"use client";

import React from 'react';
import { Button, buttonVariants } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import { ChevronSmallDownIcon } from "@/icons/ChevronSmallDownIcon";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

// We need to exclude 'link' variant for the split button
type SplitButtonVariants = Exclude<
  NonNullable<VariantProps<typeof buttonVariants>["variant"]>, 
  "link"
>;

interface SplitButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "variant"> {
  children: React.ReactNode;
  menuContent: React.ReactNode;
  onButtonClick?: () => void;
  className?: string;
  menuClassName?: string;
  variant?: SplitButtonVariants;
  size?: VariantProps<typeof buttonVariants>["size"];
}

export function SplitButton({
  children,
  menuContent,
  variant = "default",
  size = "default",
  onButtonClick,
  className,
  menuClassName,
  ...props
}: SplitButtonProps) {
  return (
    <div className="flex items-center">
      {/* Main button */}
      <Button
        variant={variant}
        size={size}
        onClick={onButtonClick}
        className={cn(
          "rounded-r-none border-r-0", 
          className
        )}
        {...props}
      >
        {children}
      </Button>
      
      {/* Divider line - visible only for outline variants */}
      {variant.toString().startsWith('outline') && (
        <div className="h-full w-[1px] bg-white/13 -mx-px relative z-10"></div>
      )}
      
      {/* Dropdown trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton
            variant={variant}
            size={
              size === "default" ? "comfortable" : 
              size === "sm" ? "compact" : 
              size === "lg" ? "comfortable" : "comfortable"
            }
            aria-label="More options"
            className={cn(
              "rounded-l-none",
              {
                "h-6": size === "default",
                "h-5": size === "sm",
                "h-8": size === "lg",
              }
            )}
          >
            <ChevronSmallDownIcon />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={menuClassName}>
          {menuContent}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SplitButton; 