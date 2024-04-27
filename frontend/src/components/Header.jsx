import ProductCarousel from "../pages/Products/ProductCarousel";
import SmallProduct from "../pages/Products/SmallProduct";
import { useGetNewProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";

const Header = () => {
  const { data, isLoading, error } = useGetNewProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Something went wrong</h1>;
  }
  return (
    <div className="flex justify-around ml-[7rem] p-3">
        <div className="xl:block lg:hidden md:hidden sm:hidden text-white">
            <div className="grid grid-cols-2 ">
                {data?.map((product) => (
                    <div key={product._id}>
                        <SmallProduct product={product} />
                    </div>
                ))}
            </div>
        </div>

        <ProductCarousel />
    </div>
  )
};

export default Header;
