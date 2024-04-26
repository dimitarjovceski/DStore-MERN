//Add favorites to localStorage
export const addFavoritesToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();

  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};
//Remove favorites from localStorage
export const removeFavoritesFromLocalStorage = (productId) => {
  const favorites = getFavoritesFromLocalStorage();

  const removeFavorite = favorites.filter(
    (product) => product._id !== productId
  );

  localStorage.setItem("favorites", JSON.stringify(removeFavorite));
};

//Retrieve favorites from localStorage
export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
