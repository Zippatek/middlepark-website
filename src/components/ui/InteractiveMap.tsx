'use client'

import React from 'react'

interface MapProps {
  center: [number, number]
  zoom?: number
  markers: {
    position: [number, number]
    title: string
    address: string
  }[]
}

/**
 * Google Maps embed. Uses the Embed API (no JS SDK, no extra deps).
 * Requires NEXT_PUBLIC_GOOGLE_MAPS_API_KEY with "Maps Embed API" enabled.
 */
export default function InteractiveMap({ center, zoom = 16, markers }: MapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const primary = markers[0]
  const [lat, lng] = primary?.position ?? center

  // Prefer a place search by address (gives the proper POI pin + info card);
  // fall back to coordinates when no address is supplied.
  const query = primary?.address
    ? encodeURIComponent(`${primary.title}, ${primary.address}`)
    : `${lat},${lng}`

  const src = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&center=${lat},${lng}&zoom=${zoom}`
    : null

  return (
    <div className="relative w-full h-full rounded-card overflow-hidden border border-cream-border bg-green-tint">
      {src ? (
        <iframe
          title={primary?.title ?? 'Property location'}
          src={src}
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-charcoal-light text-sm">
          Map unavailable — missing Google Maps API key.
        </div>
      )}
      {primary && (
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-4 py-2.5 rounded-[10px] shadow-lg max-w-[75%]">
          <p className="font-bold text-charcoal text-sm leading-tight">{primary.title}</p>
          <p className="text-xs text-charcoal-light leading-snug mt-0.5">{primary.address}</p>
        </div>
      )}
    </div>
  )
}
