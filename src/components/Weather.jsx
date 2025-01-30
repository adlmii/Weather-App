import React, { useState, useEffect } from 'react';
import axios from 'axios';

//Komponen Weather
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Jakarta');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  //Toggle tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  //Simpan tema ke local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  //Ambil data cuaca dari OpenWeatherMap API
  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = 'YOUR_API_KEY'; //Gunakan API Key OpenWeatherMap 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city]);

  //Icon cuaca
  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return 'fas fa-sun';
      case 'Clouds':
        return 'fas fa-cloud';
      case 'Rain':
        return 'fas fa-cloud-rain';
      case 'Snow':
        return 'fas fa-snowflake';
      case 'Thunderstorm':
        return 'fas fa-bolt';
      default:
        return 'fas fa-cloud-sun';
    }
  };

  return (
    <div className={`weather-app ${isDarkMode ? 'dark' : 'light'}`}>
      <button onClick={toggleTheme} className="theme-toggle">
        {isDarkMode ? '🌙' : '☀️'}
      </button>
      <h1>Weather App⛅</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      
      {weatherData && (
        <div className="weather-info">
          <i className={`${getWeatherIcon(weatherData.weather[0].main)} weather-icon`}></i>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
          <p>🌬️ Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;