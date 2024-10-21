export const filterFiveDayForecast = (forecastList) => {
  // Filter forecasts that are at 12:00 PM each day
  return forecastList
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5);
};
