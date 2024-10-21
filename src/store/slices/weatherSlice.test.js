import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import weatherReducer, { fetchWeather } from "./weatherSlice";
import { configureStore } from "@reduxjs/toolkit";

let mock;

describe("weatherSlice", () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = configureStore({
      reducer: {
        weather: weatherReducer,
      },
    });
  });

  afterEach(() => {
    mock.reset();
  });

  const initialState = {
    weatherData: null,
    loading: false,
    error: null,
  };

  it("should handle initial state", () => {
    expect(weatherReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle fetching weather data successfully", async () => {
    const mockResponse = {
      name: "New York",
      main: { temp: 20, humidity: 80 },
      wind: { speed: 5 },
    };

    mock.onGet(/api.openweathermap.org/).reply(200, mockResponse);

    await store.dispatch(fetchWeather("New York"));

    const state = store.getState().weather;

    expect(state.weatherData.name).toEqual("New York");
    expect(state.weatherData.main.temp).toEqual(20);
    expect(state.weatherData.main.humidity).toEqual(80);
    expect(state.weatherData.wind.speed).toEqual(5);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should handle fetching weather data failure", async () => {
    mock
      .onGet(/api.openweathermap.org/)
      .reply(404, { message: "City not found" });

    await store.dispatch(fetchWeather("UnknownCity"));

    const state = store.getState().weather;

    expect(state.weatherData).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error.message).toEqual("City not found");
  });
});
