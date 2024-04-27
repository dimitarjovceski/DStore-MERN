import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/features/cart/cartSlice";
import HeartIcon from "./HeartIcon";
import {toast} from "react-toastify"
import { AiOutlineShoppingCart } from "react-icons/ai";

const ProductCart = ({ product }) => {
  const dispatch = useDispatch();
  const addToCartHandler = (product, quantity) => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success("Item added successfully", {
        position: "top-right",
        autoClose: 2000
    })
  };
  return (
    <div className="max-w-xs relative  bg-[#1A1A1A] rounded-lg shadow">
      <section className="relative">
        <Link to={`/product/${product._id}`}>
          <span className="absolute bottom-3  right-3 bg-gray-800 text-white text-sm font-medium mr-1 px-2 py-1 rounded-full">
            {product?.brand}
          </span>
          <img
            src={product.image}
            alt={product.name}
            style={{ height: "220px", width:"400px", objectFit: "cover" }}
          />
        </Link>
        <HeartIcon product={product} />
      </section>
      <div className="flex justify-between items-center px-4 bg-black bg-opacity-50   p-2">
        <h2 className="text-white">{product?.name}</h2>
        <span className="text-white font-bold">
          {product?.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
      <p className="bg-black bg-opacity-50 px-4  text-gray-300 p-2">
        {product?.description.substr(0, 30)}...
      </p>

      <section className="flex justify-between px-4 items-center p-2 bg-black bg-opacity-50  ">
        <Link
          to={`/product/${product._id}`}
          className="px-4 py-2 rounded-md bg-gray-300 "
        >
          Read More...
        </Link>
        <span>
          <AiOutlineShoppingCart
            onClick={() => addToCartHandler(product, 1)}
            size={24}
            className="text-white cursor-pointer"
          />
        </span>
      </section>
    </div>
  );
};

export default ProductCart;
