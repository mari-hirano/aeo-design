import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const segmentedControlContainerVariants = cva(
  "inline-flex rounded bg-gradient-to-b from-white/13 to-white/11 shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.8),0px_0.5px_0.5px_0px_rgba(255,255,255,0.12)_inset] p-[1px]",
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
  "flex items-center justify-center rounded text-[11.5px] leading-4 tracking-[-0.01em] font-normal text-white transition-all disabled:pointer-events-none disabled:opacity-50 h-6 px-2 py-1 min-w-[24px] data-[state=active]:bg-black/50 data-[state=active]:shadow-sm",
  {
    variants: {
      isIcon: {
        true: "h-6 w-6 p-0",
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