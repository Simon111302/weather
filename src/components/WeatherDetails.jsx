import '../design/WeatherDetails.css';

function WeatherDetails({ weather }) {
  const details = [
    {
      code: 'FEELS',
      label: 'Real Feel',
      value: `${Math.round(weather.main.feels_like)} deg`,
    },
    {
      code: 'WIND',
      label: 'Wind',
      value: `${weather.wind.speed} m/s`,
    },
    {
      code: 'HUMID',
      label: 'Humidity',
      value: `${weather.main.humidity}%`,
    },
    {
      code: 'PRESS',
      label: 'Pressure',
      value: `${weather.main.pressure} hPa`,
    },
  ];

  return (
    <div className="weather-details">
      <div className="section-heading">
        <h3>Air Conditions</h3>
        <p>Core atmosphere metrics for the selected city.</p>
      </div>

      <div className="details-grid">
        {details.map((detail) => (
          <div key={detail.code} className="detail-item">
            <span className="detail-code">{detail.code}</span>
            <span className="label">{detail.label}</span>
            <span className="value">{detail.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDetails;
