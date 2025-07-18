import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string()
    .min(3, "Customer name must be at least 3 characters.")
    .max(30, "Customer name can't exceed 30 characters."),

  email: z.string()
    .email("Invalid email format."),

  contactNumber: z.string()
    .regex(/^\d{10}$/, "Contact number must be exactly 10 digits."),

  shippingAddress: z.string()
    .min(1, "Shipping address is required.")
    .max(100, "Shipping address can't exceed 100 characters."),

  productName: z.string()
    .min(3, "Product name must be at least 3 characters.")
    .max(50, "Product name can't exceed 50 characters."),

  quantity: z.coerce.number()
    .min(1, "Quantity must be at least 1.")
    .max(100, "Quantity can't be more than 100."),
});
