"use client"

import { useState, useEffect } from "react"
import { HeartIcon } from "lucide-react"

export function FallingHearts() {
  const [hearts, setHearts] = useState<Array<{
    id: number
    left: string
    delay: string
    duration: string
    size: number
    opacity: number
  }>>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Ensure we're on the client side
    setMounted(true)
    // Generate random values only on the client side
    setHearts(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${8 + Math.random() * 7}s`,
        size: 12 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.4,
      }))
    )
  }, [])

  // Don't render until mounted on client
  if (!mounted) {
    return null
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-fall text-primary"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            opacity: heart.opacity,
          }}
        >
          <HeartIcon
            className="fill-current"
            style={{
              width: heart.size,
              height: heart.size,
            }}
          />
        </div>
      ))}
    </div>
  )
}
