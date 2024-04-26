import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoritesToLocalStorage,
  removeFavoritesFromLocalStorage,
  getFavoritesFromLocalStorage,
} from "../../Utils/localStorage";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorite = () => {
    if(isFavorite){
        dispatch(removeFromFavorites(product));
        removeFavoritesFromLocalStorage(product._id)
    }else{
        dispatch(addToFavorites(product));
        addFavoritesToLocalStorage(product);
    }
  }
  return (
    <div onClick={toggleFavorite} className="absolute top-2 right-2  cursor-pointer">
      {isFavorite ? (
        <FaHeart size={24} className="text-red-600" />
      ) : (
        <FaRegHeart size={24} className="text-black" />
      )}
    </div>
  );
};

export default HeartIcon;
