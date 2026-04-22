'use client'

import { useMemo, useState } from 'react'

type BookMapImageProps = {
  src?: string
  alt: string
  className?: string
}

const FALLBACK_MAP_IMAGE = '/library_dummy_map.png'

export function BookMapImage({ src, alt, className }: BookMapImageProps) {
  const initialSrc = useMemo(() => (src?.trim() ? src : FALLBACK_MAP_IMAGE), [src])
  const [imageSrc, setImageSrc] = useState(initialSrc)

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => {
        setImageSrc(FALLBACK_MAP_IMAGE)
      }}
    />
  )
}
