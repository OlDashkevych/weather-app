import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/slices/favoritesSlice";
import { filterFiveDayForecast } from "../utils";

const WeatherCard = ({ weather }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favoriteCities);
  const { forecastData } = useSelector((state) => state.weather);
  const filteredForecast = filterFiveDayForecast(forecastData?.list || []);
  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      {!favorites.includes(weather.name) ? (
        <button onClick={() => dispatch(addFavorite(weather.name))}>
          Add to favorite
        </button>
      ) : (
        <button onClick={() => dispatch(removeFavorite(weather.name))}>
          Remove from favorite
        </button>
      )}
      <div>
        <div className="forecast-grid">
          {filteredForecast.map((forecast, index) => (
            <div key={index} className="forecast-item">
              <p>Date: {new Date(forecast.dt_txt).toLocaleDateString()}</p>
              <p>Time: {new Date(forecast.dt_txt).toLocaleTimeString()}</p>
              <p>Temperature: {forecast.main.temp} °C</p>
              <p>Humidity: {forecast.main.humidity}%</p>
              <p>Wind Speed: {forecast.wind.speed} m/s</p>
              <p>Weather: {forecast.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
