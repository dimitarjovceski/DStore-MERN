import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    var existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ message: "Already Exist" });
    }

    const category = await new Category({ name }).save();
    res.json(category);

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed creating category!" });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name;

    const updatedCategory = await category.save();

    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to update category" });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    res.json(removed);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
};
