import express from "express";
import {
  register,
  login,
  logout,
  verifyJWT,
} from "../RoutesController/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/verify", verifyJWT);

export default router;
