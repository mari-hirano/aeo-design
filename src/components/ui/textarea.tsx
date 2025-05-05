import * as React from "react"
import { cn } from "@/lib/utils"

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex w-full rounded-[4px] border border-solid px-2 py-2",
        "font-sans text-body leading-body tracking-body",
        "bg-[rgba(0,0,0,0.22)] border-[rgba(255,255,255,0.16)]",
        "focus:outline-none focus:border-[#0073E6]",
        "hover:border-[rgba(255,255,255,0.19)]",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-[#1e1e1e]",
        "placeholder:text-[rgba(255,255,255,0.5)]",
        "text-white min-h-[80px]",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea } 