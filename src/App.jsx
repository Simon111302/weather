import { useState, useEffect } from 'react';
import './App.css';
import WeatherMain from './components/WeatherMain';
import HourlyForecast from './components/HourlyForecast';
import WeatherDetails from './components/WeatherDetails';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Cebu City');
  
  const API_KEY = '0716beb656c3a0868176a2c9b2038199';
  
  const philippineCities = [
    'Cebu City',
    'Manila',
    'Quezon City',
    'Davao City',
    'Makati',
    'Pasig',
    'Taguig',
    'Caloocan',
    'Baguio City',
    'Iloilo City',
    'Bacolod City',
    'Cagayan de Oro',
    'Angeles City',
    'Batangas City',
    'Puerto Princesa'
  ];

  useEffect(() => {
    fetchWeather();
  }, [selectedCity]);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity},PH&appid=${API_KEY}&units=metric`
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch weather');
      }
      
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="loading">Error: {error}</div>;
  if (!weather) return <div className="loading">No data</div>;

  return (
    <div className="app">
      <div className="container">
        {/* City Selector */}
        <div className="city-selector">
          <select value={selectedCity} onChange={handleCityChange}>
            {philippineCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Main Grid Layout */}
        <div className="weather-grid">
          <div className="left-section">
            <WeatherMain weather={weather} />
          </div>
          
          <div className="right-section">
            <HourlyForecast />
            <WeatherDetails weather={weather} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
