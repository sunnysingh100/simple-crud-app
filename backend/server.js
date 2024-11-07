import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //allows us to accept json data in the request body
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port 5000.");
});
