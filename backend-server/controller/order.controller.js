import OrderModel from "../models/order.model.js";
import { v2 as cloudinary } from "cloudinary";

export const addOrder = async (req, res) => {
  try {
    const {
      customerName,
      email,
      contactNumber,
      shippingAddress,
      productName,
      quantity,
    } = req.body;

    let productImageUrl;

    // Multer gives file as req.file
    const file = req.file;
    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "product_images",
      });
      productImageUrl = uploadResult.secure_url;
    } else {
      throw new Error("Product image is required");
    }

    const order = new OrderModel({
      customerName,
      email,
      contactNumber,
      shippingAddress,
      productName,
      quantity,
      productImageUrl,
    });

    const savedOrder = await order.save();
    res.status(201).json({
      message: "Order placed successfully",
      data: savedOrder,
    });

    io.emit("orderCreated", savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json({ total: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findByIdAndDelete(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json({ message: "Order deleted successfully" });
    io.emit("orderDeleted", id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const order = await OrderModel.findById(id);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    order.quantity = quantity;
    await order.save();

    res.status(200).json({
      message: "Quantity updated successfully",
      data: order,
    });

    io.emit("orderUpdated", order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
