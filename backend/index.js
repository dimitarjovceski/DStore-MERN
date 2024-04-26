import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

//utils
import connectDb from "./utils/db.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());


app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/orders", orderRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.get("*", (req, res ) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});
app.listen(port, () => console.log(`Server is running on PORT: ${port}`));
