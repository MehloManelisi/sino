"use client"

import { HeartCrack, Frown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MusicPlayer } from "@/components/music-player"

interface NoResponseProps {
  onTryAgain: () => void
}

export function NoResponse({ onTryAgain }: NoResponseProps) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Image with Sad Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/roses-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-muted/80 via-muted/70 to-muted/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-2 border-muted-foreground/20 bg-card/95 shadow-2xl backdrop-blur-sm md:max-w-lg">
          <CardContent className="flex flex-col items-center p-8 text-center md:p-12">
            {/* Sad Icons */}
            <div className="mb-6 flex items-center gap-4">
              <HeartCrack className="h-16 w-16 text-muted-foreground md:h-20 md:w-20" />
            </div>

            {/* Title */}
            <h1
              className="mb-4 text-4xl tracking-wide text-muted-foreground md:text-5xl"
              style={{ fontFamily: "var(--font-great-vibes)" }}
            >
              Oh no...
            </h1>

            {/* Message */}
            <p
              className="mb-6 text-2xl text-foreground md:text-3xl"
              style={{ fontFamily: "var(--font-great-vibes)" }}
            >
              Are you sure about that?
            </p>

            {/* Sad Message */}
            <p
              className="mb-8 max-w-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              My heart is breaking... but maybe you just need a moment to think about it?
            </p>

            {/* Sad Face */}
            <Frown className="mb-6 h-10 w-10 text-muted-foreground" />

            <Button
              onClick={onTryAgain}
              size="lg"
              className="bg-primary px-8 py-6 text-lg font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              Let me think again...
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </main>
  )
}
