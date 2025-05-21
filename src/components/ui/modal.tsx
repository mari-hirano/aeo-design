"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "@/icons/XIcon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CloseDefaultIcon } from "@/icons"

const Modal = DialogPrimitive.Root

const ModalTrigger = DialogPrimitive.Trigger

const ModalPortal = DialogPrimitive.Portal

const ModalClose = DialogPrimitive.Close

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

interface ModalContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  title: string;
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
  hideClose?: boolean;
}

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ 
  className, 
  title,
  primaryAction,
  secondaryAction,
  leftAction,
  hideClose = false,
  children, 
  ...props 
}, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 w-[480px] translate-x-[-50%] translate-y-[-50%] bg-[var(--bg-primary)] p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 rounded-[4px]",
        className
      )}
      {...props}
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between px-2 py-2 border-b border-[var(--border-default)]">
        <h5 className="title-text-bold">{title}</h5>
        {!hideClose && (
          <DialogPrimitive.Close className="flex items-center justify-center h-6 w-6 rounded hover:bg-[var(--bg-tertiary-hover)] text-[var(--text-secondary)] transition-colors">
            <CloseDefaultIcon size={16} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </div>

      {/* Modal Body */}
      <div className="p-2 body-text">
        {children}
      </div>

      {/* Modal Footer */}
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
    </DialogPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = "ModalContent"

export { Modal, ModalPortal, ModalOverlay, ModalTrigger, ModalClose, ModalContent } 