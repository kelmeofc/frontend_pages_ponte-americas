import Image from "next/image"
import { Play } from "lucide-react"
import { useState } from "react"

interface TestimonialCardProps {
  name: string
  videoUrl: string
  description: string
  id: string
}

export function TestimonialCard({ name, videoUrl, id, description }: TestimonialCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    pauseVideos();
    setIsPlaying(true)
    const videoElement = document.querySelector(`video#${id}`) as any
    if (videoElement) {
      videoElement.play()
    }
  }

  const handlePauseClick = () => {
    setIsPlaying(false)
    const videoElement = document.querySelector(`video#${id}`) as any
    if (videoElement) {
      videoElement.pause()
    }
  }

  const pauseVideos = () => {
    const videosElement = document.querySelectorAll(`.depoimentos-videos`) as any
    Array.from(videosElement).map((videoElement: any) => {
      videoElement.pause()
    })
  }

  return (
    <div className="flex flex-col">
      <div className="relative rounded-xl mb-4 overflow-hidden">
        <video
          id={id}
          width="320"
          height="240"
          src={videoUrl}
          controls={false}
          playsInline
          className="depoimentos-videos w-full"
          onClick={handlePauseClick}
          onPause={handlePauseClick}
        />

        {!isPlaying && (
          <>
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="bg-[#0047FF]/80 rounded-full p-3 backdrop-blur-xs cursor-pointer hover:bg-[#0047FF] transition-colors"
                onClick={handlePlayClick}
              >
                <Play className="h-12 w-12 text-white" fill="white" />
              </div>
            </div>
          </>
        )}
      </div>

      <h3 className="text-2xl font-bold mb-2 pointer-events-none text-center">{name}</h3>
      <p className="text-[#374151] text-center text-sm pointer-events-none">{description}</p>
    </div>
  )
}