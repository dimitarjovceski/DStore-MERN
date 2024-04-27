import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { calcPrices } from "../utils/calcOrderPrice.js";
const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }
    const itemsFromDb = await Product.find({
      _id: {
        $in: orderItems.map(o => o._id)
      }
    });
    const dbOrderItems = orderItems.map(itemFromClient => {
      const matchingItemFromDb = itemsFromDb.find(itemFromDb => itemFromDb._id.toString() === itemFromClient._id);
      if (!matchingItemFromDb) {
        res.status(404);
        throw new Error(`Product not found: ${itemFromClient._id}`);
      }
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDb.price,
        _id: undefined
      };
    });
    const {
      itemsPrice,
      taxPrice,
      totalPrice,
      shippingPrice
    } = calcPrices(dbOrderItems);
    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });
    const created = await order.save();
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const userOrders = await Order.find({
      user: req.user._id
    });
    res.json(userOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};
const countTotalOrders = async (req, res) => {
  try {
    const countOrders = await Order.countDocuments();
    res.json(countOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};
const calculateTotalSales = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json({
      totalSales
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};
const calculateTotalSalesByDate = async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([{
      $match: {
        isPaid: true
      }
    }, {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$paidAt"
          }
        },
        totalSales: {
          $sum: "$totalPrice"
        }
      }
    }]);
    res.json(salesByDate);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};
const getOrderById = async (req, res) => {
  try {
    const orderById = await Order.findById(req.params.id).populate("user", "usrname email");
    if (orderById) {
      res.json(orderById);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};
const markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        updateTime: req.body.updateTime,
        emailAddress: req.body.emailAddress
      };
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};
const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};
export { createOrder, getAllOrders, getUserOrders, countTotalOrders, calculateTotalSales, calculateTotalSalesByDate, getOrderById, markOrderAsPaid, markOrderAsDelivered };