import express from "express";
import { addOrder, deleteOrder, getAllOrders, getOrderById, updateOrderQuantity } from "../controller/order.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { orderSchema } from "../validators/order.validator.js";
import { mediaUpload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/create", mediaUpload, validate(orderSchema), addOrder);

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.delete("/delete/:id", deleteOrder);
router.put("/update/:id", updateOrderQuantity);

export default router;
