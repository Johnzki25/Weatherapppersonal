import { useState, useEffect } from 'react'
import { SearchBar } from './components/SearchBar'
import { WeatherCard } from './components/WeatherCard'
import { WeatherMap } from './components/WeatherMap'
import { FavoritesList } from './components/FavoritesList'
import { LocationList } from './components/LocationList'
import { Header } from './components/Header'
import { weatherAPI } from './services/weatherAPI'
import { useLocalStorage } from './hooks/useLocalStorage'
import { getBackgroundStyle } from './utils/backgroundUtils'
import './App.css'

function App() {
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [favorites, setFavorites] = useLocalStorage('favorites', [])
  const [error, setError] = useState(null)

  // Fetch weather data for current location on load
  useEffect(() => {
    fetchUserLocation()
  }, [])

  // Fetch weather and forecast when selected location changes
  useEffect(() => {
    if (selectedLocation !== null && locations[selectedLocation]) {
      fetchWeatherData(locations[selectedLocation])
    }
  }, [selectedLocation, locations])

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          searchByCoordinates(latitude, longitude)
        },
        (error) => {
          console.log('Geolocation error:', error)
          setError('Unable to get your location. Search for a city instead.')
        }
      )
    }
  }

  const searchByCoordinates = async (lat, lon) => {
    try {
      const location = await weatherAPI.getLocationName(lat, lon)
      if (location) {
        const newLocation = {
          name: location.name,
          country: location.country,
          state: location.state || '',
          lat: location.lat,
          lon: location.lon
        }
        setLocations([newLocation])
        setSelectedLocation(0)
        await fetchWeatherAndForecast(lat, lon)
      }
    } catch (err) {
      console.error('Error fetching location:', err)
    }
  }

  const handleSearch = async (cityName) => {
    if (!cityName.trim()) {
      setSuggestions([])
      return
    }

    setLoading(true)
    setError(null)
    try {
      const results = await weatherAPI.searchCity(cityName)
      setSuggestions(results)
    } catch (err) {
      setError('Failed to search cities. Please try again.')
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }

  const handleSelectSuggestion = async (suggestion) => {
    const newLocation = {
      name: suggestion.name,
      country: suggestion.country,
      state: suggestion.state || '',
      lat: suggestion.lat,
      lon: suggestion.lon
    }

    // Check if location already exists
    const exists = locations.some(
      (loc) => loc.lat === newLocation.lat && loc.lon === newLocation.lon
    )

    if (!exists) {
      const newLocations = [...locations, newLocation]
      setLocations(newLocations)
      setSelectedLocation(newLocations.length - 1)
    } else {
      const index = locations.findIndex(
        (loc) => loc.lat === newLocation.lat && loc.lon === newLocation.lon
      )
      setSelectedLocation(index)
    }

    setSuggestions([])
  }

  const fetchWeatherData = async (location) => {
    await fetchWeatherAndForecast(location.lat, location.lon)
  }

  const fetchWeatherAndForecast = async (lat, lon) => {
    try {
      setLoading(true)
      const weather = await weatherAPI.getCurrentWeather(lat, lon)
      const forecast = await weatherAPI.getForecast(lat, lon)
      setWeatherData(weather)
      setForecastData(forecast)
      setError(null)
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.')
      console.error('Error fetching weather:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFavorite = () => {
    if (!weatherData) return

    const currentLocation = locations[selectedLocation]
    const isFavorite = favorites.some(
      (fav) => fav.lat === currentLocation.lat && fav.lon === currentLocation.lon
    )

    if (isFavorite) {
      setFavorites(
        favorites.filter(
          (fav) => !(fav.lat === currentLocation.lat && fav.lon === currentLocation.lon)
        )
      )
    } else {
      setFavorites([...favorites, currentLocation])
    }
  }

  const handleRemoveLocation = () => {
    if (locations.length === 1) {
      setLocations([])
      setSelectedLocation(null)
      setWeatherData(null)
      setForecastData(null)
    } else {
      const newLocations = locations.filter((_, i) => i !== selectedLocation)
      setLocations(newLocations)
      setSelectedLocation(newLocations.length - 1)
    }
  }

  const handleSelectFavorite = (favorite) => {
    const exists = locations.some(
      (loc) => loc.lat === favorite.lat && loc.lon === favorite.lon
    )

    if (!exists) {
      const newLocations = [...locations, favorite]
      setLocations(newLocations)
      setSelectedLocation(newLocations.length - 1)
    } else {
      const index = locations.findIndex(
        (loc) => loc.lat === favorite.lat && loc.lon === favorite.lon
      )
      setSelectedLocation(index)
    }
  }

  const handleRemoveFavorite = (favorite) => {
    setFavorites(
      favorites.filter(
        (fav) => !(fav.lat === favorite.lat && fav.lon === favorite.lon)
      )
    )
  }

  const isFavorite = weatherData && locations[selectedLocation]
    ? favorites.some(
        (fav) => fav.lat === locations[selectedLocation].lat && fav.lon === locations[selectedLocation].lon
      )
    : false

  return (
    <div className={`min-h-screen transition-all duration-1000 ${getBackgroundStyle(weatherData)}`}>
      <Header />

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
            {error}
          </div>
        )}

        <div className="mb-4 sm:mb-8">
          <SearchBar
            onSearch={handleSearch}
            suggestions={suggestions}
            onSelectSuggestion={handleSelectSuggestion}
            loading={loading}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6">
          {weatherData ? (
            <WeatherCard
              weather={weatherData}
              forecast={forecastData}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              onRemove={handleRemoveLocation}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-12 text-center">
              <p className="text-gray-500 text-base sm:text-lg">
                {locations.length === 0
                  ? 'Search for a city to get started'
                  : 'Loading weather data...'}
              </p>
            </div>
          )}

          {weatherData && locations[selectedLocation] ? (
            <WeatherMap
              latitude={locations[selectedLocation].lat}
              longitude={locations[selectedLocation].lon}
              cityName={locations[selectedLocation].name}
              weatherData={weatherData}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
              <p>Map will appear here</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <LocationList
            locations={locations}
            onSelectLocation={setSelectedLocation}
            selectedLocation={selectedLocation}
          />
          <FavoritesList
            favorites={favorites}
            onSelectFavorite={handleSelectFavorite}
            onRemoveFavorite={handleRemoveFavorite}
          />
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-400 text-center py-4 sm:py-6 mt-8 sm:mt-12 text-xs sm:text-base">
        <p>© 2026 Worldwide Weather App. Powered by OpenWeather API.</p>
      </footer>
    </div>
  )
}

export default App
