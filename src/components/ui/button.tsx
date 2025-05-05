import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-0.5 whitespace-nowrap rounded body-text transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-white/13 to-white/11 text-white shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.8),0px_0.5px_0.5px_0px_rgba(255,255,255,0.12)_inset] hover:opacity-90",
        primary:
          "bg-[#006ACC] text-white shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.8),0px_0.5px_0.5px_0px_rgba(255,255,255,0.20)_inset] hover:opacity-90",
        success:
          "bg-[#007A41] text-white shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.8),0px_0.5px_0.5px_0px_rgba(255,255,255,0.20)_inset] hover:opacity-90",
        destructive:
          "bg-[#CF313B] text-white shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.8),0px_0.5px_0.5px_0px_rgba(255,255,255,0.20)_inset] hover:opacity-90",
        warning:
          "bg-[#BF4704] text-white shadow-[0px_0.5px_1px_0px_rgba(0,0,0,0.8),0px_0.5px_0.5px_0px_rgba(255,255,255,0.20)_inset] hover:opacity-90",
        outline:
          "border border-white/13 bg-transparent text-white hover:bg-white/5",
        "outline-primary": 
          "border border-white/13 bg-transparent text-[#006ACC] hover:bg-white/5",
        "outline-success": 
          "border border-white/13 bg-transparent text-[#79E09C] hover:bg-white/5",
        "outline-destructive": 
          "border border-white/13 bg-transparent text-[#FF9C9C] hover:bg-white/5",
        "outline-warning": 
          "border border-white/13 bg-transparent text-[#FFBC86] hover:bg-white/5",
        subtle:
          "bg-transparent text-white hover:bg-white/5",
        "subtle-primary": 
          "bg-[#007DF0]/25 text-[#007DF0] hover:bg-[#007DF0]/30",
        "subtle-success": 
          "bg-[#259D4D]/25 text-[#79E09C] hover:bg-[#259D4D]/30",
        "subtle-destructive": 
          "bg-[#E42F3A]/25 text-[#FF9C9C] hover:bg-[#E42F3A]/30",
        "subtle-warning": 
          "bg-[#DF640C]/25 text-[#FFBC86] hover:bg-[#DF640C]/30",
        ghost:
          "bg-transparent text-white hover:bg-white/5",
        "ghost-primary": 
          "bg-transparent text-[#006ACC] hover:bg-[#353535]",
        "ghost-success": 
          "bg-transparent text-[#79E09C] hover:bg-[#353535]",
        "ghost-destructive": 
          "bg-transparent text-[#FF9C9C] hover:bg-[#353535]",
        "ghost-warning": 
          "bg-transparent text-[#FFBC86] hover:bg-[#353535]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-6 px-2 py-1 has-[>svg]:px-2",
        sm: "h-5 rounded gap-0.5 px-2 has-[>svg]:px-2",
        lg: "h-8 rounded px-3 has-[>svg]:px-2",
        icon: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
