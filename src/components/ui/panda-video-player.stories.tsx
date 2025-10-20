// Exemplo de uso do PandaVideoPlayer
"use client"

import { PandaVideoPlayer } from "./panda-video-player"

// Exemplo básico
export function BasicPandaVideoExample() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Exemplo Básico</h2>
      <PandaVideoPlayer
        src="/videos/demo.mp4"
        poster="/images/video-poster.jpg"
        muted={true}
        autoPlay={false}
      />
    </div>
  )
}

// Exemplo com callbacks
export function AdvancedPandaVideoExample() {
  const handlePlay = () => {
    console.log("Vídeo iniciado")
    // Analytics, tracking, etc.
  }

  const handlePause = () => {
    console.log("Vídeo pausado")
  }

  const handleEnded = () => {
    console.log("Vídeo finalizado")
    // Redirecionar, mostrar CTA, etc.
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Exemplo Avançado</h2>
      <PandaVideoPlayer
        src="/videos/sales-video.mp4"
        poster="/images/sales-poster.jpg"
        className="rounded-3xl shadow-2xl"
        muted={true}
        autoPlay={false}
        loop={false}
        controls={true}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />
    </div>
  )
}

// Exemplo para VSL (Video Sales Letter)
export function VSLPandaVideoExample() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">VSL - Video Sales Letter</h2>
      <PandaVideoPlayer
        src="/videos/vsl-presentation.mp4"
        poster="/images/vsl-cover.jpg"
        className="shadow-xl"
        muted={true}
        autoPlay={false}
        controls={false} // VSL sem controles
        onPlay={() => {
          // Track VSL start
          console.log("VSL iniciado")
        }}
        onEnded={() => {
          // Mostrar CTA, formulário, etc.
          console.log("VSL finalizado - mostrar CTA")
        }}
      />
    </div>
  )
}
