import express from "express";
import Hotel from "../models/Hotel.js";
import {
  createHotel,
  getHotel,
  updatedHotel,
  deleteHotel,
} from "../RoutesController/hotels.js";

const router = express.Router();

// 創建第一筆資料
router.post("/", createHotel);

// 找尋第一筆資料
router.get("/find/:id", getHotel);

// 修改第一筆資料
router.put("/:id", updatedHotel);

// 刪除資料
router.delete("/:id", deleteHotel);

export default router;
