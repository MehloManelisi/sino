"use client"

import dynamic from "next/dynamic"
import { HeartIcon, Sparkles, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MusicPlayer } from "@/components/music-player"

// Dynamically import FallingHearts to prevent SSR issues
const FallingHearts = dynamic(() => import("@/components/falling-hearts").then(mod => ({ default: mod.FallingHearts })), {
  ssr: false,
})

interface YesResponseProps {
  onReset: () => void
}

export function YesResponse({ onReset }: YesResponseProps) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/roses-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-accent/10 to-primary/20" />
      </div>

      {/* Extra Hearts for Celebration */}
      <FallingHearts />
      <FallingHearts />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-2 border-primary/30 bg-card/95 shadow-2xl backdrop-blur-sm md:max-w-lg">
          <CardContent className="flex flex-col items-center p-8 text-center md:p-12">
            {/* Celebration Icons */}
            <div className="mb-6 flex items-center gap-4">
              <PartyPopper className="h-10 w-10 animate-bounce text-accent" />
              <HeartIcon className="h-16 w-16 animate-pulse-heart fill-primary text-primary md:h-20 md:w-20" />
              <PartyPopper className="h-10 w-10 animate-bounce text-accent" style={{ animationDelay: "0.2s" }} />
            </div>

            {/* Sparkles */}
            <div className="mb-4 flex gap-2">
              <Sparkles className="h-6 w-6 animate-pulse text-accent" />
              <Sparkles className="h-6 w-6 animate-pulse text-primary" style={{ animationDelay: "0.3s" }} />
              <Sparkles className="h-6 w-6 animate-pulse text-accent" style={{ animationDelay: "0.6s" }} />
            </div>

            {/* Title */}
            <h1
              className="mb-4 text-4xl tracking-wide text-primary md:text-6xl"
              style={{ fontFamily: "var(--font-great-vibes)" }}
            >
              Yay!!!
            </h1>

            {/* Message */}
            <p
              className="mb-2 text-3xl text-foreground md:text-4xl"
              style={{ fontFamily: "var(--font-great-vibes)" }}
            >
              You Made Me
            </p>
            <p
              className="mb-6 text-4xl text-primary md:text-5xl"
              style={{ fontFamily: "var(--font-great-vibes)" }}
            >
              The Happiest!
            </p>

            {/* Love Message */}
            <p
              className="mb-8 max-w-sm text-lg text-muted-foreground"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              I knew you would say yes! I promise to make this the most magical Valentine{"'"}s Day ever. I love you so much!
            </p>

            {/* Hearts Row */}
            <div className="mb-6 flex gap-2">
              {[...Array(5)].map((_, i) => (
                <HeartIcon
                  key={i}
                  className="h-6 w-6 fill-primary text-primary"
                  style={{
                    animation: "pulse-heart 1s ease-in-out infinite",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            <Button
              onClick={onReset}
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
            >
              Ask Again
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </main>
  )
}
