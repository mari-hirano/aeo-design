import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ChevronSmallDownIcon } from "@/icons"

const selectVariants = cva(
  "flex h-6 w-full rounded-[4px] border border-solid px-2 py-0 text-body appearance-none focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed pr-6",
  {
    variants: {
      variant: {
        default: "color-input-bg border-[var(--input-border)] text-white focus:border-[#0073E6] hover:border-[rgba(255,255,255,0.19)] disabled:bg-[#1e1e1e]",
        button: "bg-gradient-to-b from-white/13 to-white/11 text-white shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.8),0px_0.5px_0.5px_0px_rgba(255,255,255,0.12)_inset] hover:opacity-90 border-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, VariantProps<typeof selectVariants> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div className="flex-1 relative w-full">
        <select
          className={cn(selectVariants({ variant, className }))}
          ref={ref}
          {...props}
        />
        <div className="absolute h-4 w-4 right-1 top-1/2 transform -translate-y-1/2 pointer-events-none color-text-secondary">
          <ChevronSmallDownIcon size={16} />
        </div>
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select } 