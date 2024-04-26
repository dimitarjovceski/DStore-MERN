import express from "express";
import { auhtorizeAdmin, authenticate } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  getOrderById,
  markOrderAsPaid,
  markOrderAsDelivered
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, auhtorizeAdmin, getAllOrders);
router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authenticate, getOrderById);
router.route("/:id/pay").put(authenticate, markOrderAsPaid);
router.route("/:id/deliver").put(authenticate, auhtorizeAdmin, markOrderAsDelivered)

router
export default router;
