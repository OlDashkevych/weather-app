import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather, fetchForecastData } from "../store/slices/weatherSlice";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (city) {
      dispatch(fetchWeather(city));
      dispatch(fetchForecastData(city));
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
