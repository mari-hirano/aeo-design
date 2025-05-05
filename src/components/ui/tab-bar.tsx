import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tabBarContainerVariants = cva(
  "inline-flex border-b border-white/13 w-full",
  {
    variants: {
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      fullWidth: true,
    },
  }
)

const tabBarItemVariants = cva(
  "flex items-center justify-center text-[11.5px] leading-4 tracking-[-0.01em] font-normal text-white/67 transition-all disabled:pointer-events-none disabled:opacity-50 h-8 px-3 py-1 relative data-[state=active]:text-white hover:text-white",
  {
    variants: {
      isIcon: {
        true: "w-8 p-0",
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

interface TabBarProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

const TabBar = React.forwardRef<HTMLDivElement, TabBarProps>(
  ({ className, fullWidth, value, onValueChange, children, ...props }, ref) => {
    return (
      <div
        className={cn(tabBarContainerVariants({ fullWidth }), className)}
        ref={ref}
        role="tablist"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<TabBarItemProps>(child)) return null
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
TabBar.displayName = "TabBar"

interface TabBarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  isIcon?: boolean
  isActive?: boolean
  isFullWidth?: boolean
}

const TabBarItem = React.forwardRef<HTMLButtonElement, TabBarItemProps>(
  ({ className, children, value, isIcon, isActive, isFullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        className={cn(tabBarItemVariants({ isIcon, isFullWidth }), className)}
        {...props}
      >
        {children}
        {isActive && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
        )}
      </button>
    )
  }
)
TabBarItem.displayName = "TabBarItem"

export { TabBar, TabBarItem } 