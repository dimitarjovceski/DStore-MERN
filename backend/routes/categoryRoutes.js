import express from "express";
import { authenticate, auhtorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").post(authenticate, auhtorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticate, auhtorizeAdmin, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, auhtorizeAdmin, deleteCategory);

router.route("/").get(getCategories);
router.route("/:id").get(getCategoryById);

export default router;
