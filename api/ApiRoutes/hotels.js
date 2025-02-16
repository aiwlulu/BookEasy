import express from "express";
import {
  createHotel,
  getHotel,
  updatedHotel,
  deleteHotel,
  getAllHotels,
  amountOfType,
  amountOfCities,
} from "../RoutesController/hotels.js";
import { verifyAdmin } from "../JWT_Token.js";

const router = express.Router();

// 創建飯店 (需管理員權限)
router.post("/", verifyAdmin, createHotel);

// 找尋特定飯店資料 (公開)
router.get("/find/:id", getHotel);

// 取得所有飯店資料 (公開)
router.get("/", getAllHotels);

// 修改飯店資料 (需管理員權限)
router.put("/:id", verifyAdmin, updatedHotel);

// 刪除飯店資料 (需管理員權限)
router.delete("/:id", verifyAdmin, deleteHotel);

// 取得不同類型飯店的數量 (公開)
router.get("/amountoftype", amountOfType);

// 取得不同城市的飯店數量 (公開)
router.get("/amountofcities", amountOfCities);

export default router;
