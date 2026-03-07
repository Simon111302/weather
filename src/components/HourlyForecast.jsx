import { useEffect, useState } from 'react';
import '../design/HourlyForecast.css';

function formatCityDateKey(timestamp, timezoneOffset) {
  const cityDate = new Date((timestamp + timezoneOffset) * 1000);

  return [
    cityDate.getUTCFullYear(),
    String(cityDate.getUTCMonth() + 1).padStart(2, '0'),
    String(cityDate.getUTCDate()).padStart(2, '0'),
  ].join('-');
}

function getCityHour(timestamp, timezoneOffset) {
  return new Date((timestamp + timezoneOffset) * 1000).getUTCHours();
}

function formatCityTime(timestamp, timezoneOffset) {
  return new Date((timestamp + timezoneOffset) * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

function HourlyForecast({ forecast, timezoneOffset = 0 }) {
  const [activeTimestamp, setActiveTimestamp] = useState(() =>
    Math.floor(Date.now() / 1000)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const todayKey = formatCityDateKey(activeTimestamp, timezoneOffset);
  const hours = forecast
    .filter(
      (item) =>
        formatCityDateKey(item.dt, timezoneOffset) === todayKey &&
        getCityHour(item.dt, timezoneOffset) >= 7 &&
        getCityHour(item.dt, timezoneOffset) <= 23
    )
    .map((item) => ({
      time: formatCityTime(item.dt, timezoneOffset),
      temp: Math.round(item.main.temp),
      icon: item.weather?.[0]?.icon,
      description: item.weather?.[0]?.description ?? 'weather',
    }))
    .filter((item) => item.icon);

  return (
    <div className="hourly-forecast">
      <div className="section-heading">
        <h3>Today's Forecast</h3>
        <p>Daytime outlook from 7:00 AM to 11:00 PM.</p>
      </div>

      <div className="hourly-list">
        {hours.length > 0 ? (
          hours.map((hour, index) => (
            <div key={`${hour.time}-${index}`} className="hour-item">
              <p className="time">{hour.time}</p>
              <div className="hour-icon-shell">
                <img
                  src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
                  alt={hour.description}
                />
              </div>
              <p className="temp">{hour.temp}&deg;</p>
              <p className="condition">{hour.description}</p>
            </div>
          ))
        ) : (
          <p className="time">No forecast data available for today.</p>
        )}
      </div>
    </div>
  );
}

export default HourlyForecast;
