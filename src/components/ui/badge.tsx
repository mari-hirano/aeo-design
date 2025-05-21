import * as React from "react"
import { cn } from "@/lib/utils"
import { CloseDefaultIcon } from "@/icons/CloseDefaultIcon"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "blue" | "green" | "pink" | "purple" | "orange" | "yellow"
  size?: "compact" | "comfort"
  shape?: "rounded" | "square"
  styleType?: "tinted" | "solid"
  prefixIcon?: React.ReactNode
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", size = "compact", shape = "rounded", styleType = "tinted", prefixIcon, children, ...props }, ref) => {
    // Color variants for tinted style
    const tintedVariantClasses = {
      default: "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]",
      blue: "bg-[var(--blue-transparent)] text-[var(--blue-text)]",
      green: "bg-[var(--green-transparent)] text-[var(--green-text)]",
      pink: "bg-[var(--pink-transparent)] text-[var(--pink-text)]",
      purple: "bg-[var(--purple-transparent)] text-[var(--purple-text)]",
      orange: "bg-[var(--orange-transparent)] text-[var(--orange-text)]",
      yellow: "bg-[var(--yellow-transparent)] text-[var(--yellow-text)]",
    }

    // Color variants for solid style
    const solidVariantClasses = {
      default: "bg-[rgba(0,0,0,0.22)] text-white",
      blue: "bg-[var(--blue-bg)] text-white",
      green: "bg-[var(--green-bg)] text-white",
      pink: "bg-[var(--pink-bg)] text-white",
      purple: "bg-[var(--purple-bg)] text-white",
      orange: "bg-[var(--orange-bg)] text-white",
      yellow: "bg-[var(--yellow-bg)] text-black",
    }

    // Size variants
    const sizeClasses = {
      compact: "h-4 body-text py-0 px-1.5",
      comfort: "h-6 body-text py-0 px-2",
    }

    // Shape variants
    const shapeClasses = {
      rounded: "rounded-full",
      square: "rounded-[2px]",
    }

    const styleClasses = styleType === "tinted" ? tintedVariantClasses[variant] : solidVariantClasses[variant]

    return (
      <div
        className={cn(
          "inline-flex items-center border-0",
          sizeClasses[size],
          shapeClasses[shape],
          styleClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {prefixIcon && (
          <span className="mr-1 flex items-center">
            {prefixIcon}
          </span>
        )}
        <span>{children}</span>
      </div>
    )
  }
)
Badge.displayName = "Badge"

export { Badge } 