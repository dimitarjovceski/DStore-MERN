import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { auhtorizeAdmin, authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, auhtorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/auth/logout", logoutUser);
router
  .get("/profile", authenticate, getCurrentUserProfile)
  .put("/profile", authenticate, updateCurrentUserProfile);

//ADMIN ROUTES
router
  .route("/:id")
  .delete(authenticate, auhtorizeAdmin, deleteUserById)
  .get(authenticate, auhtorizeAdmin, getUserById)
  .put(authenticate, auhtorizeAdmin, updateUserById);

export default router;
