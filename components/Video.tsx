import { useMemo } from 'react'
export interface VideoProps {
  poster: string
  webm: string
  mp4: string
  borderRadius?: number
}

export function Video ({ poster, mp4, webm, borderRadius = 10 }: VideoProps) {
  return (
    <video autoPlay muted loop poster={poster} style={{ borderRadius }} playsInline>
      <source src={webm} type='video/webm; codecs=vp9,vorbis' />
      <source src={mp4} type='video/mp4' />
    </video>
  )
}