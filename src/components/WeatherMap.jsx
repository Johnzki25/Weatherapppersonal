import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export const WeatherMap = ({ latitude, longitude, cityName, weatherData }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (!latitude || !longitude || !mapRef.current) return

    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([latitude, longitude], 10)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current)
    } else {
      // Update existing map
      mapInstanceRef.current.setView([latitude, longitude], 10)
    }

    // Add or update marker
    if (mapInstanceRef.current.markerGroup) {
      mapInstanceRef.current.markerGroup.clearLayers()
    } else {
      mapInstanceRef.current.markerGroup = L.featureGroup().addTo(mapInstanceRef.current)
    }

    const popupContent = `
      <div class="text-center">
        <p class="font-semibold text-lg">${cityName}</p>
        ${weatherData ? `
          <div class="mt-2 text-sm">
            <p class="font-semibold">${Math.round(weatherData.main.temp)}°C</p>
            <p class="text-gray-600 capitalize">${weatherData.weather[0].main}</p>
            <p class="text-xs text-gray-500 mt-1">Humidity: ${weatherData.main.humidity}%</p>
          </div>
        ` : ''}
      </div>
    `

    const marker = L.marker([latitude, longitude])
      .bindPopup(popupContent)
      .openPopup()

    mapInstanceRef.current.markerGroup.addLayer(marker)
  }, [latitude, longitude, cityName, weatherData])

  if (!latitude || !longitude) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
        <p>Select a location to view on map</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
      <div ref={mapRef} style={{ height: '100%', width: '100%', minHeight: '500px' }} />
    </div>
  )
}
