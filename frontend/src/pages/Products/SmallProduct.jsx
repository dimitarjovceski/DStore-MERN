import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] p-3">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="rounded h-[240px] w-[400px] object-cover"
          />
        </Link>

        <HeartIcon product={product} />

        <div className="py-4 px-4 bg-black bg-opacity-50 hover:bg-opacity-100 ">
          <Link
            to={`/product/${product._id}`}
            className="flex justify-between items-center  text-white"
          >
            <h2>{product.name.substr(0, 40)}...</h2>
            <span className="bg-gray-400 text-black rounded py-1 px-2">
              ${product.price}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
