import React from 'react'

export const FavoritesList = ({ favorites, onSelectFavorite, onRemoveFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center text-gray-500 text-sm sm:text-base">
        <p>No favorite locations yet. Add some to get started!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">Favorite Locations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {favorites.map((favorite, index) => (
          <div
            key={index}
            className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-500 transition cursor-pointer text-sm sm:text-base"
          >
            <div className="flex justify-between items-start gap-2">
              <button
                onClick={() => onSelectFavorite(favorite)}
                className="flex-1 text-left"
              >
                <p className="font-semibold text-gray-800 truncate">{favorite.name}</p>
                <p className="text-xs sm:text-sm text-gray-500 truncate">{favorite.country}</p>
              </button>
              <button
                onClick={() => onRemoveFavorite(favorite)}
                className="text-red-500 hover:text-red-700 font-bold flex-shrink-0"
                title="Remove from favorites"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
