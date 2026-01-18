import '../design/WeatherDetails.css';

function WeatherDetails({ weather }) {
  return (
    <div className="weather-details">
      <h3>Air Conditions</h3>
      <div className="details-grid">
        <div className="detail-item">
          <span className="label">Real Feel</span>
          <span className="value">{Math.round(weather.main.feels_like)}°</span>
        </div>
        <div className="detail-item">
          <span className="label">Wind</span>
          <span className="value">{weather.wind.speed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="label">Humidity</span>
          <span className="value">{weather.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Pressure</span>
          <span className="value">{weather.main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails;
