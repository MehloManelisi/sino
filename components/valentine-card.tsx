"use client"

import { useState, useEffect } from "react"
import { HeartIcon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const cardBackgrounds = [
  "/images/card-bg-1.jpg",
  "/images/card-bg-2.jpg",
  "/images/card-bg-3.jpg",
]

interface ValentineCardProps {
  onYes: () => void
  onNo: () => void
}

export function ValentineCard({ onYes, onNo }: ValentineCardProps) {
  const [noButtonSize, setNoButtonSize] = useState(1)
  const [noAttempts, setNoAttempts] = useState(0)
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % cardBackgrounds.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleNoHover = () => {
    if (noAttempts < 5) {
      setNoButtonSize((prev) => Math.max(prev * 0.8, 0.5))
      setNoAttempts((prev) => prev + 1)
    }
  }

  const noMessages = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
  ]

  return (
    <Card className="relative w-full max-w-md overflow-hidden border-2 border-primary/20 shadow-2xl md:max-w-lg">
      {/* Slideshow Background */}
      <div className="absolute inset-0">
        {cardBackgrounds.map((bg, index) => (
          <Image
            key={bg}
            src={bg || "/placeholder.svg"}
            alt="Romantic background"
            fill
            className={`object-cover transition-opacity duration-1000 ${
              index === currentBgIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/80" />
      </div>
      
      <CardContent className="relative z-10 flex flex-col items-center p-8 text-center md:p-12">
        {/* Animated Heart */}
        <div className="relative mb-6">
          <HeartIcon className="h-20 w-20 animate-pulse-heart fill-primary text-primary md:h-24 md:w-24" />
          <Sparkles className="absolute -right-2 -top-2 h-6 w-6 text-accent" />
          <Sparkles className="absolute -bottom-1 -left-3 h-5 w-5 text-primary" />
        </div>

        {/* Title */}
        <h1
          className="mb-4 text-4xl tracking-wide text-primary md:text-5xl"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          My Dearest
        </h1>

        {/* Message */}
        <p
          className="mb-2 text-2xl text-foreground md:text-3xl"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Will You Be My
        </p>
        <p
          className="mb-8 text-5xl text-primary md:text-6xl"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Valentine?
        </p>

        {/* Romantic Message */}
        <p
          className="mb-8 max-w-sm text-muted-foreground"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Every moment with you is a treasure. You make my heart skip a beat and my soul sing with joy.
        </p>

        {/* Buttons */}
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={onYes}
            size="lg"
            className="group relative w-full overflow-hidden bg-primary px-10 py-6 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-lg sm:w-auto"
          >
            <HeartIcon className="mr-2 h-5 w-5 fill-current transition-transform group-hover:scale-125" />
            Yes, I Will!
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 opacity-0 transition-opacity group-hover:opacity-100" />
          </Button>

          <Button
            onClick={onNo}
            onMouseEnter={handleNoHover}
            variant="outline"
            size="lg"
            className="w-full border-2 border-muted-foreground/30 px-8 py-6 text-lg font-medium text-muted-foreground transition-all duration-300 hover:border-muted-foreground/50 hover:bg-secondary sm:w-auto bg-transparent"
            style={{
              transform: `scale(${noButtonSize})`,
              opacity: noButtonSize,
            }}
          >
            {noMessages[Math.min(noAttempts, noMessages.length - 1)]}
          </Button>
        </div>

        {noAttempts > 0 && noAttempts < 5 && (
          <p className="mt-4 text-sm text-muted-foreground animate-in fade-in" style={{ fontFamily: "var(--font-poppins)" }}>
            Come on, just say yes! 
          </p>
        )}
      </CardContent>
    </Card>
  )
}
