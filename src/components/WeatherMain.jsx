import '../design/WeatherMain.css';

function WeatherMain({ weather }) {
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  return (
    <div className="weather-main">
      <div className="location">
        <h1>{weather.name}</h1>
        <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
      </div>
      
      <div className="current-weather">
        <div className="temperature">
          <h2>{Math.round(weather.main.temp)}°</h2>
          <p>{weather.weather[0].description}</p>
        </div>
        <img 
          src={getWeatherIcon(weather.weather[0].icon)} 
          alt={weather.weather[0].description}
          className="weather-icon"
        />
      </div>
    </div>
  );
}

export default WeatherMain;
