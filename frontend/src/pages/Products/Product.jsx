import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[500px] h-[280px] object-cover rounded"
        />

        <HeartIcon product={product} />
      </div>

      <div className="p-4 text-white bg-black bg-opacity-50 hover:bg-opacity-100">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name.substr(0, 30)}...</div>
            <span className="mr-[0.5rem] bg-gray-400 py-1 text-black px-3 rounded">
              $ {product.price}
            </span>
          </h2>
          <p className="mt-4">{product.description.substr(0,60)}...</p>
        </Link>
      </div>
    </div>
  );
};

export default Product;
