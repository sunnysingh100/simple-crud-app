import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); //allows us to accept json data in the request body
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port 5000.");
});
