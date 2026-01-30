import React from 'react'

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <h1 className="text-2xl sm:text-4xl font-bold">🌍 Worldwide Weather</h1>
        <p className="text-xs sm:text-base text-blue-100 mt-1 sm:mt-2">Check weather conditions around the globe</p>
      </div>
    </header>
  )
}
