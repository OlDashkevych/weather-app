import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Favorites from "./components/Favorites";
import { fetchWeather, fetchForecastData } from "./store/slices/weatherSlice";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { weatherData, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    const savedCity = "New York";
    dispatch(fetchWeather(savedCity));
    dispatch(fetchForecastData(savedCity));
  }, [dispatch]);

  return (
    <div className="app-container">
      <h1>Weather Dashboard</h1>
      <SearchBar />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && <WeatherCard weather={weatherData} />}

      <Favorites />
    </div>
  );
};

export default App;
