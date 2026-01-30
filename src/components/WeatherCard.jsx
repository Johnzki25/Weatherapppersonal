import React from 'react'

const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`
}

export const WeatherCard = ({ weather, forecast, isFavorite, onToggleFavorite, onRemove }) => {
  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-500">Select a city to view weather</p>
      </div>
    )
  }

  const temp = Math.round(weather.main.temp)
  const feelsLike = Math.round(weather.main.feels_like)
  const iconCode = weather.weather[0].icon
  const description = weather.weather[0].main

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-4 sm:p-6 text-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">{weather.name}</h2>
          <p className="text-sm sm:text-base text-blue-100">{weather.sys.country}</p>
        </div>
        <button
          onClick={onToggleFavorite}
          className={`text-xl sm:text-2xl transition ${isFavorite ? 'text-yellow-300' : 'text-blue-200'}`}
        >
          ★
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center justify-center">
          <img src={getWeatherIcon(iconCode)} alt={description} className="w-16 sm:w-24 h-16 sm:h-24" />
          <div className="ml-2 sm:ml-4">
            <div className="text-3xl sm:text-5xl font-bold">{temp}°C</div>
            <p className="text-xs sm:text-base text-blue-100">Feels like {feelsLike}°C</p>
          </div>
        </div>
      </div>

      <p className="text-base sm:text-lg capitalize mb-4">{description}</p>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 bg-blue-500 bg-opacity-30 rounded-lg p-3 sm:p-4">
        <div>
          <p className="text-xs sm:text-sm text-blue-100">Humidity</p>
          <p className="text-lg sm:text-xl font-semibold">{weather.main.humidity}%</p>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-blue-100">Wind Speed</p>
          <p className="text-lg sm:text-xl font-semibold">{weather.wind.speed} m/s</p>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-blue-100">Pressure</p>
          <p className="text-lg sm:text-xl font-semibold">{weather.main.pressure} hPa</p>
        </div>
      </div>

      {forecast && forecast.list && (
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3">5-Day Forecast</h3>
          <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2">
            {forecast.list.slice(0, 8).map((item, index) => (
              <div key={index} className="bg-blue-500 bg-opacity-30 rounded-lg p-2 sm:p-3 min-w-max text-center">
                <p className="text-xs text-blue-100">{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <img src={getWeatherIcon(item.weather[0].icon)} alt="weather" className="w-8 sm:w-12 h-8 sm:h-12 mx-auto" />
                <p className="text-sm sm:text-base font-semibold">{Math.round(item.main.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onRemove}
        className="w-full bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base font-semibold py-2 rounded-lg transition"
      >
        Remove
      </button>
    </div>
  )
}
