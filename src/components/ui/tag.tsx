import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[4px] body-text transition-all",
  {
    variants: {
      variant: {
        default: "bg-[#006ACC]/10 text-[#006ACC] border border-[#006ACC]/20",
        primary: "bg-[#006ACC] text-white",
        secondary: "bg-[#222222] text-white border border-white/10",
        outline: "bg-transparent text-white border border-white/20",
        ghost: "bg-transparent text-white hover:bg-white/5",
      },
      size: {
        default: "h-6 px-2",  // 24px height
        sm: "h-5 px-1.5",     // 20px height
        lg: "h-7 px-3",       // 28px height
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  asChild?: boolean
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(tagVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Tag.displayName = "Tag"

export { Tag, tagVariants } 