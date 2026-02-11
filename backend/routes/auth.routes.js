import express from "express";
import {
  validateLogin,
  validateRegister
} from "../middleware/validation.middleware.js";
import {
  login,
  register,
  resetPassword,
  resetPasswordRequest,
  verifyEmail
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/verify", verifyEmail);
router.post("/reset-password-request", resetPasswordRequest);
router.post("/reset-password", resetPassword)

export default router;
