import Header from "./components/Header";
import Loader from "./components/Loader";
import Product from "./pages/Products/Product";
import { useGetAllProductsQuery } from "./redux/api/productApiSlice";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading } = useGetAllProductsQuery();
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between items-center px-10">
            <h1 className="text-white ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-black text-white py-2 font-bold opacity-80 hover:opacity-100 px-10 rounded-full mr-[20rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>
          <div className="flex justify-center flex-wrap mt-[3rem]">
            {data?.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
