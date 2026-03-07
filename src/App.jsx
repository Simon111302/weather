import { useState, useEffect } from 'react';
import './App.css';
import WeatherMain from './components/WeatherMain';
import HourlyForecast from './components/HourlyForecast';
import WeatherDetails from './components/WeatherDetails';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Cebu City');

  const API_KEY = import.meta.env.VITE_API_KEY;

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
    'Puerto Princesa',
  ];

  useEffect(() => {
    fetchWeather();

    const intervalId = setInterval(() => {
      fetchWeather();
    }, 300000);

    return () => clearInterval(intervalId);
  }, [selectedCity]);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity},PH&appid=${API_KEY}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity},PH&appid=${API_KEY}&units=metric`;

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl),
      ]);

      const [weatherData, forecastData] = await Promise.all([
        weatherResponse.json(),
        forecastResponse.json(),
      ]);

      if (!weatherResponse.ok) {
        throw new Error(weatherData.message || 'Failed to fetch weather');
      }

      if (!forecastResponse.ok) {
        throw new Error(forecastData.message || 'Failed to fetch forecast');
      }

      setWeather(weatherData);
      setForecast(forecastData.list ?? []);
      setLoading(false);
    } catch (fetchError) {
      console.error('Error fetching weather:', fetchError);
      setError(fetchError.message);
      setForecast([]);
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  if (loading) return <div className="loading">Loading weather data...</div>;
  if (error) return <div className="loading">Error: {error}</div>;
  if (!weather) return <div className="loading">No data</div>;

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <div className="app-copy">
            <p className="app-kicker">Weather Atlas</p>
            <h2>Philippines forecast dashboard</h2>
            <p className="app-subtitle">
              Live city conditions, daytime forecast windows, and core air metrics.
            </p>
          </div>

          <div className="city-selector">
            <label htmlFor="city-select">Choose city</label>
            <select id="city-select" value={selectedCity} onChange={handleCityChange}>
              {philippineCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="weather-grid">
          <div className="left-section">
            <WeatherMain weather={weather} />
          </div>

          <div className="right-section">
            <HourlyForecast forecast={forecast} timezoneOffset={weather.timezone} />
            <WeatherDetails weather={weather} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
