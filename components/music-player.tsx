"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(
      "https://cdn.pixabay.com/audio/2022/02/15/audio_7c57addb16.mp3"
    )
    audioRef.current.loop = true
    audioRef.current.volume = 0.4

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    // Auto-play after first user interaction with the page
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true)
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          // Autoplay was prevented
          setIsPlaying(false)
        })
      }
    }

    document.addEventListener("click", handleFirstInteraction, { once: true })
    document.addEventListener("touchstart", handleFirstInteraction, { once: true })

    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }
  }, [hasInteracted])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }

  return (
    <Button
      onClick={toggleMusic}
      variant="outline"
      size="icon"
      className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full border-2 border-primary/30 bg-card/80 text-primary shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-card hover:text-primary md:bottom-6 md:right-6"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <VolumeX className="h-5 w-5" />
      )}
    </Button>
  )
}
