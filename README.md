# Worldwide Weather App

A modern, responsive weather application built with React and Vite that allows you to check weather conditions for locations worldwide.

## Features

- 🌍 **Global Weather Search**: Search for any city worldwide with autocomplete suggestions
- 📍 **Current Location**: Automatically detects your location (with permission)
- ⭐ **Favorite Locations**: Save your favorite cities for quick access
- 📊 **Current Conditions**: View temperature, humidity, wind speed, and pressure
- 📈 **5-Day Forecast**: See hourly weather forecasts
- 🎨 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 💾 **Local Storage**: Your favorite locations are saved locally

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **OpenWeather API** - Weather data

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Johnzki25/Weatherapppersonal.git
cd Weatherapppersonal
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your OpenWeather API key:
```
VITE_WEATHER_API_KEY=your_api_key_here
```

Get your free API key at [OpenWeather](https://openweathermap.org/api)

4. Start the development server:
```bash
npm run dev
```

The app will open in your browser at `http://localhost:3000`

## Usage

1. **Search Cities**: Use the search bar to find any city worldwide. Suggestions appear as you type.
2. **View Weather**: Click on a suggestion to view current weather and forecast
3. **Save Favorites**: Click the star icon to add locations to favorites
4. **Manage Locations**: View and switch between multiple locations
5. **Remove Locations**: Click the remove button to delete a location

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder, ready for deployment.

## Deployment

This app is ready to be deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the environment variable `VITE_WEATHER_API_KEY` in Vercel settings
4. Deploy!

## License

MIT
