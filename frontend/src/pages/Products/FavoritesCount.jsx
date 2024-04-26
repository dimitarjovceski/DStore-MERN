import {useSelector} from "react-redux"

const FavoritesCount = () => {
    const favorites = useSelector(state => state.favorites);
    const favoritesLength = favorites.length;
  return (
    <div>
        {favoritesLength > 0 && (
            <span>{favoritesLength}</span>
        )}
    </div>
  )
}

export default FavoritesCount