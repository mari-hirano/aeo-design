"use client"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="h-screen">
      {children}
    </div>
  )
} 