import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      image,
      category,
      quantity
    } = req.fields;

    //Validation
    switch (true) {
      case !name:
        return res.status(400).json({
          error: "Name is required"
        });
      case !brand:
        return res.status(400).json({
          error: "Brand is required"
        });
      case !description:
        return res.status(400).json({
          error: "Description is required"
        });
      case !price:
        return res.status(400).json({
          error: "Price is required"
        });
      case !image:
        return res.status(400).json({
          error: "Image is required"
        });
      case !category:
        return res.status(400).json({
          error: "Category is required"
        });
      case !quantity:
        return res.status(400).json({
          error: "Quantity is required"
        });
    }
    const product = new Product({
      ...req.fields
    });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      category,
      quantity
    } = req.fields;

    //Validation
    switch (true) {
      case !name:
        return res.status(400).json({
          error: "Name is required"
        });
      case !brand:
        return res.status(400).json({
          error: "Brand is required"
        });
      case !description:
        return res.status(400).json({
          error: "Description is required"
        });
      case !price:
        return res.status(400).json({
          error: "Price is required"
        });
      case !category:
        return res.status(400).json({
          error: "Category is required"
        });
      case !quantity:
        return res.status(400).json({
          error: "Quantity is required"
        });
    }
    const productToUpdate = await Product.findByIdAndUpdate(req.params.id, {
      ...req.fields
    }, {
      new: true
    });
    await productToUpdate.save();
    res.json(productToUpdate);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const productToDelete = await Product.findByIdAndDelete(req.params.id);
    res.json(productToDelete);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});
const getProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: "i"
      }
    } : {};
    const count = await Product.countDocuments({
      ...keyword
    });
    const products = await Product.find({
      ...keyword
    }).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error"
    });
  }
});
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      message: "Product not found"
    });
  }
});
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).populate("category").limit(12).sort({
      createdAt: -1
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error"
    });
  }
});
const addReviews = asyncHandler(async (req, res) => {
  try {
    const {
      rating,
      comment
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
      await product.save();
      res.status(201).json({
        message: "Review added"
      });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});
const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const topProducts = await Product.find({}).sort({
      rating: -1
    }).limit(4);
    res.json(topProducts);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});
const getNewProducts = asyncHandler(async (req, res) => {
  try {
    const newProducts = await Product.find({}).sort({
      _id: -1
    }).limit(5);
    res.json(newProducts);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
});
const filterProducts = asyncHandler(async (req, res) => {
  try {
    const {
      checked,
      radio
    } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = {
      $gte: radio[0],
      $lte: radio[1]
    };
    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});
export { createProduct, updateProduct, deleteProduct, getProducts, getProductById, getAllProducts, addReviews, getTopProducts, getNewProducts, filterProducts };