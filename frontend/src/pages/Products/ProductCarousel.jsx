import { useGetNewProductsQuery } from "../../redux/api/productApiSlice";
import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaBox,
  FaShoppingCart,
  FaClock,
  FaStore,
  FaStar,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetNewProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 xl:block lg:block md:block mr-[2rem]">
      {isLoading ? null : error ? (
        <h1 className="text-red-500">{error?.data?.message}</h1>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full object-cover max-h-[30rem] rounded"
                />

                <div className="flex justify-between w-[20rem]">
                  <div className="one text-white mt-3">
                    <h2>{name}</h2>
                    <p>{price}</p>
                    <p className="text-gray-400 w-[25rem] mt-3">
                      {description.substring(0, 150)}...
                    </p>
                  </div>

                  <div className="flex justify-between w-[20rem] ml-[2rem] mt-3">
                    <div className="text-white">
                      <h1 className="flex items-center mb-6 w-[9rem]">
                        <FaStore className="mr-2 text-white" />
                        Brand: {brand}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[15rem]">
                        <FaClock className="mr-2 text-white" />
                        Added: {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaStar className="mr-2 text-white" />
                        Reviews: {numReviews}
                      </h1>
                    </div>

                    <div className="text-white">
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaStar className="text-white mr-2" />
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaShoppingCart className="text-white mr-2" />
                        Quantity: {quantity} 
                      </h1>
                      <h1 className="flex items-center mb-6 w-[8rem]">
                        <FaBox className="text-white mr-2" />
                        In Stock: {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
