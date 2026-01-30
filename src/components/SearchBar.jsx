import React from 'react'

export const SearchBar = ({ onSearch, suggestions, onSelectSuggestion, loading }) => {
  const [input, setInput] = React.useState('')
  const [showSuggestions, setShowSuggestions] = React.useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setInput(value)
    if (value.trim().length > 2) {
      onSearch(value)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSelectSuggestion = (suggestion) => {
    onSelectSuggestion(suggestion)
    setInput('')
    setShowSuggestions(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input)
      setShowSuggestions(false)
    }
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search for a city..."
          className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition whitespace-nowrap"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0 text-sm sm:text-base"
            >
              <p className="font-semibold text-gray-900">
                {suggestion.name}{suggestion.state ? `, ${suggestion.state}` : ''}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">{suggestion.country}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
