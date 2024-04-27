import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { useGetFilteredProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import {
  setCategories,
  setProducts,
  setChecked,
  setRadio,
} from "../../redux/features/shop/shopSlice";
import ProductCart from "../Products/ProductCart";

const Shop = () => {
  const [priceFilter, setPriceFilter] = useState("");
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useGetCategoriesQuery();
  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [dispatch, categoriesQuery.data]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery?.data.filter(
          (product) => {
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [dispatch, filteredProductsQuery.data, checked, radio, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedCheck = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedCheck));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];
  return (
    <div className="container mx-auto ml-[8rem]">
      <div className="flex md:flex-row">
        <div className="bg-black text-white p-3 mt-2 mb-2">
          <h2 className="text-center bg-gray-300 py-2 text-black rounded-full">
            Filter by Categories
          </h2>

          <div className="p-5 w-[15rem]">
            {categories?.map((category) => (
              <div key={category._id} className="mb-2">
                <div className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={(e) => handleCheck(e.target.value, category._id)}
                    className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"
                  />
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-sm text-gray-300 uppercase"
                  >
                    {category.name}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <h2 className="h4 text-center  py-2 bg-gray-300 py-2 text-black rounded-full mb-2">
            Filter by Brand
          </h2>

          <div className="p-5">
            {uniqueBrands?.map((brand) => (
              <>
                <div key={brand._id} className="flex items-center mb-5 mr-4">
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    className="w-4 h-4"
                    onChange={() => handleBrandClick(brand)}
                  />

                  <label htmlFor="brand" className="text-sm uppercase text-gray-300 ml-2">
                    {brand}
                  </label>
                </div>
              </>
            ))}
          </div>

          <div className="p-5 w-[15rem]">
            <h2 className="h4 text-center  py-2 bg-gray-300 py-2 text-black rounded-full mb-6">
              Filter by Price
            </h2>

            <input
              type="text"
              placeholder="Enter price"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="rounded-lg p-2 bg-[#1A1A1A] text-white text-center focus:outline-none focus:ring focus:border-gray-500 "
            />
          </div>

          <div className="p-5 mt-0">
            <button
              onClick={() => window.location.reload()}
              className="w-full border rounded-md my-4 opacity-80 hover:opacity-100"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="p-3">
          <h2 className="text-2xl text-white ml-5">
            {products?.length} Products
          </h2>
          <div className="flex flex-wrap">
            {products?.length === 0 ? (
              <span className="text-2xl text-white md:mt-[5rem] md:ml-[20rem]">No available products with your filters</span>
            ) : (
              products?.map((product) => (
                <div key={product._id} className="p-3">
                  <ProductCart product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
