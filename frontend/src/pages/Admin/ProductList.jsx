import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useGetCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { useNavigate } from "react-router-dom";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [countInStock, setCountInStock] = useState("");
  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const { data: categories } = useGetCategoriesQuery();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      console.log(res);
      toast.success("Successfully uploaded");
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      console.error(error.message);
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("brand", brand);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("price", price);
      productData.append("imageUrl", imageUrl);
      productData.append("countInStock", countInStock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Failed to create product");
      } else {
        toast.success(`${data.name} is created successfully`);
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
       <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 text-2xl text-white mb-3">Create Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border px-4 font-bold py-5 text-white block w-[40rem] text-center rounded-lg cursor-pointer">
              {image ? image.name : "Upload Photo"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="py-3">
            <div className="flex flex-wrap gap-4">
              <div>
                <label htmlFor="name" className="text-white">
                  Name
                </label>
                <br />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 border p-3 mb-3 w-[30rem] rounded-lg text-white bg-black"
                />
              </div>
              <div>
                <label htmlFor="name block" className="text-white">
                  Price
                </label>
                <br />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 border p-3 mb-3 w-[30rem] rounded-lg text-white bg-black"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div>
                <label htmlFor="quantity" className="text-white">
                  Quantity
                </label>
                <br />
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mt-1 border p-3 mb-3 w-[30rem] rounded-lg text-white bg-black"
                />
              </div>
              <div>
                <label htmlFor="name block" className="text-white">
                  Brand
                </label>
                <br />
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-1 border p-3 mb-3 w-[30rem] rounded-lg text-white bg-black"
                />
              </div>
            </div>

            <label className="text-white">Description</label>
            <br />
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 border p-3 mb-3 w-[40rem] rounded-lg text-white bg-black"
            />

            <div className="flex justify-between">
              <div className="flex flex-col flex-1">
                <label className="text-white">Count in Stock</label>
                <input
                  type="number"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  className="mt-1 border p-3 mb-3 w-[30rem] rounded-lg text-white bg-black"
                />
              </div>

              <div className="flex flex-col flex-1">
                <label className="text-white">Category</label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-black text-white"
                >
                  {categories?.map((c) => (
                    <option
                      className="bg-black text-white gap-1"
                      key={c._id}
                      value={c._id}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="p-3 opacity-80 w-[50%] hover:opacity-100 border mt-5 rounded-lg text-white text-lg font-bold bg-black"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
