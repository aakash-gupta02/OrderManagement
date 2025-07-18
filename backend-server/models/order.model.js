import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    contactNumber: {
      type: String,
      required: true,
      match: /^\d{10}$/,
    },
    shippingAddress: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    productName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    productImageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
