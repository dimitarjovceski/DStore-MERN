import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorite = () => {
  const favorites = useSelector(selectFavoriteProduct);
  console.log(favorites);
  return (
    <>
      {favorites.length === 0 ? (
         <div className="text-white text-2xl ml-[40rem]">
         No favorites. <Link to="/shop">Go to shop</Link>
       </div>
      ) : (
        <div className="ml-[10rem]">
          <h1 className="text-2xl font-bold text-white">Favorite Products</h1>

          <div className="flex flex-wrap mt-3">
            {favorites.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Favorite;
