"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/dvsn.mp4")
    audio.loop = true
    audio.volume = 0.4
    audio.preload = "auto"
    
    // Handle audio events
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = (e: Event) => {
      console.error("Audio error:", e)
      setIsPlaying(false)
    }
    
    const handleLoadedData = async () => {
      console.log("Audio loaded successfully")
      // Try to auto-play when audio is loaded
      try {
        await audio.play()
        setIsPlaying(true)
      } catch (error) {
        // Autoplay was prevented, will need user interaction
        console.log("Autoplay prevented, waiting for user interaction")
        setAutoplayBlocked(true)
        setIsPlaying(false)
      }
    }
    
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("error", handleError)
    audio.addEventListener("loadeddata", handleLoadedData)
    
    // Try to play immediately (may be blocked by browser)
    audio.play().catch(() => {
      // Autoplay blocked, will play on first user interaction
      setAutoplayBlocked(true)
      setIsPlaying(false)
    })
    
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener("play", handlePlay)
        audioRef.current.removeEventListener("pause", handlePause)
        audioRef.current.removeEventListener("error", handleError)
        audioRef.current.removeEventListener("loadeddata", handleLoadedData)
        audioRef.current = null
      }
    }
  }, [])

  // Handle autoplay fallback on user interaction
  useEffect(() => {
    if (!autoplayBlocked || !audioRef.current) return

    const handleFirstInteraction = async () => {
      if (audioRef.current && !isPlaying) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
          setAutoplayBlocked(false)
        } catch (error) {
          console.error("Error playing audio:", error)
        }
      }
    }
    
    document.addEventListener("click", handleFirstInteraction, { once: true })
    document.addEventListener("touchstart", handleFirstInteraction, { once: true })
    
    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }
  }, [autoplayBlocked, isPlaying])

  const toggleMusic = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
        setAutoplayBlocked(false)
      }
    } catch (error) {
      console.error("Error toggling music:", error)
      setIsPlaying(false)
    }
  }

  return (
    <Button
      onClick={toggleMusic}
      variant="outline"
      size="icon"
      className="fixed top-4 right-4 z-50 h-12 w-12 rounded-full border-2 border-primary/30 bg-card/80 text-primary shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-card hover:text-primary md:top-6 md:right-6"
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
