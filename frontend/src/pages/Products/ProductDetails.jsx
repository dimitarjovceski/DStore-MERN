import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import HeartIcon from "../../pages/Products/HeartIcon";
import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";
import {
  useGetProductDetailsQuery,
  useAddReviewsMutation,
} from "../../redux/api/productApiSlice";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const [addReviews, { isLoading: loadingProductReview }] =
    useAddReviewsMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await addReviews({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    toast.success(`${product.name} added to cart`)
    navigate("/cart")
  };
  return (
    <>
      <div className="ml-[10rem]">
        <Link
          to="/"
          className="text-2xl font-semibold text-white hover:underline"
        >
          Go back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1 className="text-red-500">
          {error?.data?.message || error.message}
        </h1>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] md:ml-[10rem] gap-5">
            <div>
              <img
                src={product?.image}
                alt={product?.name} 
                className="w-full h-[600px] xl:w-[45rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] object-cover"
              />
              <div className="absolute right-[51rem] top-2">
              <HeartIcon product={product} />

              </div>
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold text-white uppercase">
                {product?.name.substr(0,50)}
              </h2>
              <p className="xl:w-[30rem] text-gray-400 lg:w-[30rem] md:w-[20rem] sm:w-[10rem]">
                {product?.description}
              </p>
              <p className="text-5xl font-extrabold my-4 text-white">
                $ {product?.price}
              </p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one text-white">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="text-white mr-2" />
                    Brand: {product?.brand}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaClock className="text-white mr-2" />
                    Added: {moment(product?.createdAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="text-white mr-2" />
                    Reviews: {product?.numReviews}
                  </h1>
                </div>

                <div className="two text-white">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" />
                    Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-white" />
                    Quantity: {product?.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaBox className="mr-2 text-white" />
                    In Stock: {product?.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap justify-between">
                <Ratings
                  value={product.rating}
                  text={`${product?.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-white bg-black mr-[10rem]"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                  className="py-2 px-4 bg-black text-white rounded-md opacity-80 hover:opacity-100"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
