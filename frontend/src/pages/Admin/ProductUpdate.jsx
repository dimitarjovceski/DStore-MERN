import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../redux/api/categoryApiSlice";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  useGetProductByIdQuery,
} from "../../redux/api/productApiSlice";
import { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [brand, setBrand] = useState(productData?.brand || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [countInStock, setCountInStock] = useState(
    productData?.countInStock || ""
  );

  const navigate = useNavigate();

  const { data: categories =[]} = useGetCategoriesQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setImage(productData.image);
      setName(productData.name);
      setDescription(productData.description);
      setBrand(productData.brand);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setPrice(productData.price);
      setCountInStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (error) {
      console.error(error.message);
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("countInStock", countInStock);

      const { data } = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error("Failed to update product");
      } else {
        toast.success("Item updated successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/")
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to update product");
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this product?"
      );

      if (answer) {
        const { data } = await deleteProduct(params._id).unwrap();
        toast.success(`${data.name} is deleted`);
        navigate("/admin/allproducts");
      } else {
        return;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12 md:text-2xl text-white">Update/Delete Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block max-w-[350px] max-h-[350px] mb-5 object-cover rounded-md"
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

          <div className="p-3 mx-auto">
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
                  className="p-4 mb-3 w-[28rem] border rounded-lg bg-black text-white"
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

            <div>
              <button
                onClick={handleSubmit}
                className="p-3 mr-5 opacity-70 hover:opacity-100 mt-5 rounded-lg text-white text-lg font-bold bg-black"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="p-3 opacity-70 hover:opacity-100 mt-5 rounded-lg text-white text-lg font-bold bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
