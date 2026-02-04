"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { HeartIcon } from "lucide-react"
import { ValentineCard } from "@/components/valentine-card"
import { YesResponse } from "@/components/yes-response"
import { NoResponse } from "@/components/no-response"
import { MusicPlayer } from "@/components/music-player"

// Dynamically import FallingHearts to prevent SSR issues
const FallingHearts = dynamic(() => import("@/components/falling-hearts").then(mod => ({ default: mod.FallingHearts })), {
  ssr: false,
})

export default function ValentinePage() {
  const [response, setResponse] = useState<"yes" | "no" | null>(null)

  if (response === "yes") {
    return <YesResponse onReset={() => setResponse(null)} />
  }

  if (response === "no") {
    return <NoResponse onTryAgain={() => setResponse(null)} />
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/rose2.jpg"
          alt="Beautiful roses background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/15 to-background/20" />
      </div>

      {/* Falling Hearts Animation */}
      <FallingHearts />

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Decorative Hearts */}
        <div className="absolute left-4 top-8 text-primary opacity-60 md:left-12">
          <HeartIcon className="h-8 w-8 animate-float fill-current md:h-12 md:w-12" style={{ animationDelay: "0s" }} />
        </div>
        <div className="absolute right-8 top-16 text-accent opacity-50 md:right-20">
          <HeartIcon className="h-6 w-6 animate-float fill-current md:h-10 md:w-10" style={{ animationDelay: "0.5s" }} />
        </div>
        <div className="absolute bottom-20 left-8 text-primary opacity-40 md:left-16">
          <HeartIcon className="h-10 w-10 animate-float fill-current md:h-14 md:w-14" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute bottom-32 right-4 text-accent opacity-60 md:right-12">
          <HeartIcon className="h-7 w-7 animate-float fill-current md:h-11 md:w-11" style={{ animationDelay: "1.5s" }} />
        </div>

        <ValentineCard onYes={() => setResponse("yes")} onNo={() => setResponse("no")} />
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </main>
  )
}
