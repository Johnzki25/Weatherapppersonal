import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'demo'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const weatherAPI = {
  getCurrentWeather: async (lat, lon) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching current weather:', error)
      throw error
    }
  },

  getForecast: async (lat, lon) => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching forecast:', error)
      throw error
    }
  },

  searchCity: async (cityName) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
        params: {
          q: cityName,
          limit: 10,
          appid: API_KEY
        }
      })
      return response.data
    } catch (error) {
      console.error('Error searching city:', error)
      throw error
    }
  },

  getLocationName: async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          limit: 1
        }
      })
      return response.data[0]
    } catch (error) {
      console.error('Error getting location name:', error)
      return null
    }
  }
}
