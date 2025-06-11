import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg"
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = "md", ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false)
    
    const sizeClasses = {
      sm: "h-5 w-5 body-text",
      md: "h-6 w-6 body-text",
      lg: "h-8 w-8 body-text"
    }

    return (
      <div
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full bg-[var(--bg-accent)] border-0",
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            onError={() => setImgError(true)}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--bg-accent)] text-white">
            {fallback ? fallback.substring(0, 2).toUpperCase() : "?"}
          </div>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: Array<{
    src?: string
    alt?: string
    fallback?: string
  }>
  max?: number
  size?: "sm" | "md" | "lg"
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, avatars, max = 5, size = "md", ...props }, ref) => {
    const visibleAvatars = avatars.slice(0, max)
    const remainingCount = avatars.length > max ? avatars.length - max : 0
    
    return (
      <div 
        className={cn("flex items-center", className)} 
        ref={ref} 
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <div 
            key={index} 
            className="relative" 
            style={{ 
              marginLeft: index === 0 ? 0 : "-4px",
              zIndex: visibleAvatars.length - index // Higher z-index for leftmost avatars
            }}
          >
            <Avatar 
              src={avatar.src} 
              alt={avatar.alt} 
              fallback={avatar.fallback}
              size={size}
              className={cn(
                "border-0",
                index !== 0 && "relative"
              )}
            />
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div 
            className="relative" 
            style={{ 
              marginLeft: "-4px",
              zIndex: 0 // Lowest z-index for the +N avatar
            }}
          >
            <Avatar 
              size={size}
              className="border-0"
              fallback={`+${remainingCount}`}
            />
          </div>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarGroup } 