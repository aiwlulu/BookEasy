import Hotel from "../models/Hotel.js";
import { errorMessage } from "../errorMessage.js";

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    next(errorMessage(400, "無法創建飯店資料，請檢查輸入格式是否正確", error));
  }
};
const getHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getHotel = await Hotel.findById(id);
    if (!getHotel) {
      return next(errorMessage(404, "找不到指定飯店的資料", null));
    }
    res.status(200).json(getHotel);
  } catch (error) {
    next(errorMessage(400, "無效的飯店ID格式", error));
  }
};
const updatedHotel = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (!updatedHotel) {
      return next(errorMessage(404, "找不到要更新的飯點資料", null));
    }
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(
      errorMessage(
        400,
        "修改失敗，請確認是否有其id與是否欄位輸入格式正確",
        error
      )
    );
  }
};
const deleteHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Hotel.findByIdAndDelete(id);
    if (!result) {
      return next(errorMessage(404, "找不到要刪除的飯店資料", null));
    }
    res.status(200).json("刪除資料成功");
  } catch (error) {
    next(errorMessage(400, "刪除失敗，請確認是否有其id", error));
  }
};

export { createHotel, getHotel, updatedHotel, deleteHotel };
