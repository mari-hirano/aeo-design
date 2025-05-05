"use client"

export default function StyleGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dark">{children}</div>
  )
} 