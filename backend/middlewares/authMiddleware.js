import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  //Read jwt from the jwt cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token!");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token!");
  }
});

const auhtorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as admin.");
  }
};


export { authenticate, auhtorizeAdmin };
