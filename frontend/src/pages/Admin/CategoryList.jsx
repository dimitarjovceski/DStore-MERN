import { useState } from "react";
import CategoryForm from "../../components/CategoryForm";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisibile, setModalVisible] = useState(false);

  const { data: categories } = useGetCategoriesQuery();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const res = await createCategory({ name }).unwrap();

      if (res.error) {
        toast.error(res.error);
      } else {
        setName("");
        toast.success(`${res.name} is created`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating category failed, try again!");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Name is required!");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error("Something wrong");
      }
      {
        toast.success(`${result.name} is updated`);
        setModalVisible(false);
        setSelectedCategory(null);
        setUpdatingName("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted`);
        setModalVisible(false);
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed deletion. Try again!");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <h1 className="text-2xl text-white ">Manage Categories</h1>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
          buttonText="Add"
        />
        <br />
        <hr />

        <div className="flex flex-wrap gap-1 mt-2">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-black opacity-70 text-white py-2 px-4 rounded-lg hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisibile} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
