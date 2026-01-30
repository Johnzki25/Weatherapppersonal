import React from 'react'

export const LocationList = ({ locations, onSelectLocation, selectedLocation }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">Viewing Locations</h2>
      {locations.length === 0 ? (
        <p className="text-gray-500 text-center py-3 sm:py-4 text-sm sm:text-base">No locations added yet</p>
      ) : (
        <div className="space-y-2">
          {locations.map((location, index) => (
            <button
              key={index}
              onClick={() => onSelectLocation(index)}
              className={`w-full p-2 sm:p-3 text-left rounded-lg border-2 transition text-sm sm:text-base ${
                selectedLocation === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <p className="font-semibold text-gray-800 truncate">{location.name}</p>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {location.state && `${location.state}, `}{location.country}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
