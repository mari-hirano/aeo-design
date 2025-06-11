import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const segmentedControlContainerVariants = cva(
  "inline-flex rounded shadow-[var(--shadow-button-default)] p-[1px] bg-gradient-to-b from-black/6 to-black/3 dark:from-white/5 dark:to-white/8",
  {
    variants: {
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  }
)

const segmentedControlItemVariants = cva(
  "segmented-control-item flex items-center justify-center body-text text-[var(--text-secondary)] transition-all disabled:pointer-events-none disabled:opacity-50 [.theme-designer_&]:h-[22px] [.theme-dashboard_&]:h-[30px] px-2 py-1 min-w-[24px] data-[state=active]:text-[var(--text-primary)] data-[state=active]:bg-white dark:data-[state=active]:bg-[var(--black-a50)] data-[state=active]:rounded-[3px] data-[state=active]:shadow-[var(--shadow-button-default)]",
  {
    variants: {
      isIcon: {
        true: "[.theme-designer_&]:h-[22px] [.theme-designer_&]:w-[22px] [.theme-dashboard_&]:h-[30px] [.theme-dashboard_&]:w-[30px] p-0",
        false: "",
      },
      isFullWidth: {
        true: "flex-1",
        false: "",
      }
    },
    defaultVariants: {
      isIcon: false,
      isFullWidth: false,
    },
  }
)

interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ className, fullWidth, value, onValueChange, children, ...props }, ref) => {
    return (
      <div
        className={cn(segmentedControlContainerVariants({ fullWidth }), className)}
        ref={ref}
        role="tablist"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<SegmentedControlItemProps>(child)) return null
          return React.cloneElement(child, {
            isActive: child.props.value === value,
            onClick: () => onValueChange(child.props.value),
            isFullWidth: fullWidth,
          })
        })}
      </div>
    )
  }
)
SegmentedControl.displayName = "SegmentedControl"

interface SegmentedControlItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  isIcon?: boolean
  isActive?: boolean
  isFullWidth?: boolean
}

const SegmentedControlItem = React.forwardRef<HTMLButtonElement, SegmentedControlItemProps>(
  ({ className, children, value, isIcon, isActive, isFullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        className={cn(segmentedControlItemVariants({ isIcon, isFullWidth }), className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SegmentedControlItem.displayName = "SegmentedControlItem"

export { SegmentedControl, SegmentedControlItem } 