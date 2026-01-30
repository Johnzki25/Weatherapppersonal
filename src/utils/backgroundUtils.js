export const getBackgroundStyle = (weatherData) => {
  if (!weatherData) {
    return 'bg-gradient-to-br from-blue-100 to-blue-200'
  }

  const weather = weatherData.weather[0].main.toLowerCase()
  const isDayTime = weatherData.sys.sunset > Date.now() / 1000

  const weatherStyles = {
    // Clear/Sunny
    clear: isDayTime
      ? 'bg-gradient-to-br from-blue-300 via-blue-200 to-yellow-100'
      : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black',
    
    // Clouds
    clouds: isDayTime
      ? 'bg-gradient-to-br from-gray-300 via-gray-200 to-blue-100'
      : 'bg-gradient-to-br from-gray-800 via-gray-700 to-indigo-900',
    
    // Rain
    rain: 'bg-gradient-to-br from-gray-500 via-gray-400 to-blue-400',
    drizzle: 'bg-gradient-to-br from-gray-400 via-gray-300 to-blue-300',
    
    // Thunderstorm
    thunderstorm: 'bg-gradient-to-br from-gray-800 via-gray-700 to-yellow-600',
    
    // Snow
    snow: 'bg-gradient-to-br from-blue-100 via-blue-50 to-white',
    
    // Mist/Fog
    mist: 'bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100',
    smoke: 'bg-gradient-to-br from-gray-400 via-gray-300 to-gray-200',
    haze: 'bg-gradient-to-br from-yellow-200 via-gray-200 to-gray-100',
    dust: 'bg-gradient-to-br from-yellow-300 via-gray-200 to-gray-300',
    fog: 'bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100',
    sand: 'bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-200',
    ash: 'bg-gradient-to-br from-gray-500 via-gray-400 to-gray-300',
    squall: 'bg-gradient-to-br from-gray-600 via-gray-500 to-blue-400',
    tornado: 'bg-gradient-to-br from-gray-900 via-gray-700 to-yellow-600',
  }

  return weatherStyles[weather] || 'bg-gradient-to-br from-blue-100 to-blue-200'
}
