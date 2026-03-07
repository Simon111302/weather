import '../design/WeatherMain.css';

function WeatherMain({ weather }) {
  const visibilityKm = weather.visibility ? (weather.visibility / 1000).toFixed(1) : null;

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  return (
    <div className="weather-main">
      <div className="weather-main__halo" />

      <div className="location">
        <span className="weather-main__eyebrow">Live conditions</span>
        <h1>{weather.name}</h1>
        <p>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className="current-weather">
        <div className="temperature">
          <span className="temperature-tag">{weather.weather[0].main}</span>
          <h2>{Math.round(weather.main.temp)}&deg;</h2>
          <p>{weather.weather[0].description}</p>
        </div>
        <img
          src={getWeatherIcon(weather.weather[0].icon)}
          alt={weather.weather[0].description}
          className="weather-icon"
        />
      </div>

      <div className="summary-ribbon">
        <div className="summary-pill">
          <span className="summary-label">High</span>
          <strong>{Math.round(weather.main.temp_max)}&deg;</strong>
        </div>
        <div className="summary-pill">
          <span className="summary-label">Low</span>
          <strong>{Math.round(weather.main.temp_min)}&deg;</strong>
        </div>
        <div className="summary-pill">
          <span className="summary-label">Clouds</span>
          <strong>{weather.clouds?.all ?? 0}%</strong>
        </div>
        <div className="summary-pill">
          <span className="summary-label">Visibility</span>
          <strong>{visibilityKm ? `${visibilityKm} km` : 'N/A'}</strong>
        </div>
      </div>
    </div>
  );
}

export default WeatherMain;
