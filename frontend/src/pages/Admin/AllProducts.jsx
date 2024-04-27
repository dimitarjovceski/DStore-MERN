import { useGetAllProductsQuery } from "../../redux/api/productApiSlice";
import { Link } from "react-router-dom";
import moment from "moment";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products } = useGetAllProductsQuery();
  return (
    <div className="mx-[10rem] ">
      <h1 className="text-white md:text-2xl">
        All Products ({products?.length})
      </h1>

      <div className="flex flex-wrap items-center">
        {products?.map((product) => (
          <Link
            key={product._id}
            to={`/admin/product/update/${product._id}`}
            className="block mb-4 overflow-hidden"
          >
            <div className="flex mt-5 items-center">
              <img
                src={product.image}
                alt="product"
                className=" object-cover h-[150px] w-[150px]"
              />

              <div className="p-4 flex flex-col justify-around">
                <div className="flex justify-between gap-3 items-center">
                  <h5 className="text-xl font-semibold mb-2 text-white">
                    {product?.name}
                  </h5>

                  <p className="text-gray-400 text-sm">
                    {moment(product?.createdAt).format("MMMM Do YYYY")}
                  </p>
                </div>

                <p className="text-gray-400 mt-2">{product?.description?.substring(0, 150)}...</p>

                <div className="flex justify-between mt-3 items-center">
                 <Link to={`/admin/product/update/${product._id}`} className="py-2 px-4 bg-black text-white rounded-lg opacity-80 hover:opacity-100">
                  Update
                 </Link>

                 <p className="text-white font-bold">${product.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <AdminMenu />
    </div>
  );
};

export default AllProducts;
