import express from "express";
import formidable from "express-formidable";
import checkId from "../middlewares/checkId.js";

import { auhtorizeAdmin, authenticate } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  getAllProducts,
  addReviews,
  getTopProducts,
  getNewProducts,
  filterProducts,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(authenticate, auhtorizeAdmin, formidable(), createProduct);

router.route("/getAllProducts").get(getAllProducts);

router.route("/filtered-products").post(filterProducts);

router.route("/:id/reviews").post(authenticate, checkId, addReviews);

router.get("/top", getTopProducts);
router.get("/new", getNewProducts);

router
  .route("/:id")
  .get(getProductById)
  .put(authenticate, auhtorizeAdmin, formidable(), updateProduct)
  .delete(authenticate, auhtorizeAdmin, deleteProduct);
export default router;
