"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useOrder } from "./redux/orderHook";
import Navbar from "./components/Navbar";
import { toast } from "react-toastify";

const OrderForm = () => {
  const { createOrder, isLoading, error } = useOrder();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setImageError("Only JPG/PNG files are allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setImageError("File size must be less than 2MB");
      return;
    }
    setImageError(null);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const imageFile = document.getElementById("media").files[0];
      if (!imageFile) {
        setImageError("Product image is required");
        toast.error("Product image is required");
        return;
      }
      formData.append("media", imageFile);

      await createOrder(formData);

    
      toast.success("Order created successfully");
      reset();
      setImagePreview(null);
    } catch (err) {
      toast.error("Order creation failed");
      console.error("Order creation failed:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Place New Order</h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              {...register("customerName", {
                required: "Name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 30, message: "Maximum 30 characters" },
              })}
              placeholder="Customer Name"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-base"
            />
            {errors.customerName && (
              <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Email"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-base"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("contactNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Must be 10 digits",
                },
              })}
              placeholder="Contact Number"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-base"
            />
            {errors.contactNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.contactNumber.message}</p>
            )}
          </div>
          <div>
            <textarea
              {...register("shippingAddress", {
                required: "Address is required",
                maxLength: {
                  value: 100,
                  message: "Maximum 100 characters",
                },
              })}
              rows={3}
              placeholder="Shipping Address"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-base resize-none"
            />
            {errors.shippingAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.shippingAddress.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("productName", {
                required: "Product name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 50, message: "Maximum 50 characters" },
              })}
              placeholder="Product Name"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-base"
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-600">{errors.productName.message}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Minimum 1" },
                max: { value: 100, message: "Maximum 100" },
                valueAsNumber: true,
              })}
              placeholder="Quantity"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 text-base"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
            )}
          </div>
          <div>
            <input
              id="media"
              name="media"
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {imageError && (
              <p className="mt-1 text-sm text-red-600">{imageError}</p>
            )}
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 object-contain rounded border"
                />
              </div>
            )}
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrderForm;
