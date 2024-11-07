import Product from "../model/product.model.js";
import mongoose from "mongoose";
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({success: true, data: products});
  } catch (error) {
    console.log("error in getting products", error.message);
    res.status(500).json({success: false, message: "Server error"});
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({success: false, message: "Please provide all fields"});
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res
      .status(201)
      .json({success: true, message: "Product created", data: newProduct});
  } catch (error) {
    console.error("Error in creating product:", error.message);
    res.status(500).json({success: false, message: "Server error"});
  }
};

export const updateProduct = async (req, res) => {
  const {id} = req.params;
  const productData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success: false, message: "Product not found"});
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({success: false, message: "Product not found"});
    }

    res.status(200).json({success: true, data: updatedProduct});
  } catch (error) {
    console.error("Error in updating product:", error.message);
    res.status(500).json({success: false, message: "Server error"});
  }
};

export const deleteProduct = async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({success: false, message: "Product not found"});
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({success: true, message: "Product deleted"});
  } catch (error) {
    console.error("Error in deleting product:", error.message);
    res.status(500).json({success: false, message: "Server error"});
  }
};
