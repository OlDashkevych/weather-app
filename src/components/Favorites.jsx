import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../store/slices/favoritesSlice";
import { fetchWeather } from "../store/slices/weatherSlice";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favoriteCities);
  const dispatch = useDispatch();

  return (
    <div className="favorites">
      <h3>Your Favorite Cities</h3>
      <ul>
        {favorites.map((city, index) => (
          <li className="favorite-item" key={index}>
            <span
              onClick={() => dispatch(fetchWeather(city))}
              className="favorite-name"
            >
              {city}
            </span>
            <button
              className="favorite-rm-btn"
              onClick={() => dispatch(removeFavorite(city))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
