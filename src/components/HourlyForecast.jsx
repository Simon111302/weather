import '../design/HourlyForecast.css';

function HourlyForecast() {
  const hours = [
    { time: '2:00 PM', temp: 31, icon: '01d' },
    { time: '3:00 PM', temp: 32, icon: '01d' },
    { time: '4:00 PM', temp: 31, icon: '02d' },
    { time: '5:00 PM', temp: 30, icon: '02d' },
    { time: '6:00 PM', temp: 29, icon: '03d' },
  ];

  return (
    <div className="hourly-forecast">
      <h3>Today's Forecast</h3>
      <div className="hourly-list">
        {hours.map((hour, index) => (
          <div key={index} className="hour-item">
            <p className="time">{hour.time}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
              alt="weather"
            />
            <p className="temp">{hour.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
