'use client'

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Leaflet with Next.js — Using custom Forest Green pin
const customIcon = typeof window !== 'undefined' ? L.divIcon({
  className: 'custom-pin',
  html: `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-8 h-8 bg-green/20 rounded-full animate-ping"></div>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C10.477 0 6 4.477 6 10C6 17.5 16 32 16 32C16 32 26 17.5 26 10C26 4.477 21.523 0 16 0Z" fill="#286B38"/>
        <circle cx="16" cy="10" r="4" fill="white"/>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
}) : null

interface MapProps {
  center: [number, number]
  zoom?: number
  markers: {
    position: [number, number]
    title: string
    address: string
  }[]
}

export default function InteractiveMap({ center, zoom = 15, markers }: MapProps) {
  return (
    <div className="w-full h-full rounded-card overflow-hidden border border-cream-border z-10">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => customIcon && (
          <Marker key={index} position={marker.position} icon={customIcon}>
            <Popup>
              <div className="p-1">
                <h4 className="font-bold text-charcoal text-sm mb-1">{marker.title}</h4>
                <p className="text-xs text-charcoal-light leading-snug">{marker.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
