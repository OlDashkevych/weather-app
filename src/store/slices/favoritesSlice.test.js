import favoritesReducer, {
  addFavorite,
  removeFavorite,
} from "./favoritesSlice";

describe("favoritesSlice", () => {
  const initialState = {
    favoriteCities: [],
  };

  it("should return the initial state", () => {
    expect(favoritesReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle adding a city", () => {
    const newState = favoritesReducer(initialState, addFavorite("New York"));
    expect(newState.favoriteCities).toEqual(["New York"]);
  });

  it("should handle adding a city only once", () => {
    let newState = favoritesReducer(initialState, addFavorite("New York"));
    newState = favoritesReducer(newState, addFavorite("New York"));
    expect(newState.favoriteCities).toEqual(["New York"]);
  });

  it("should handle removing a city", () => {
    const stateWithCity = {
      favoriteCities: ["New York"],
    };
    const newState = favoritesReducer(
      stateWithCity,
      removeFavorite("New York")
    );
    expect(newState.favoriteCities).toEqual([]);
  });
});
