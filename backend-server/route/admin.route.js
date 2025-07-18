import express from "express";
import { login, register } from "../controller/admin.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/admin.validator.js";

const router = express.Router();

router.post("/admin/register", validate(registerSchema), register);
router.post("/admin/login", validate(loginSchema), login);

export default router;
