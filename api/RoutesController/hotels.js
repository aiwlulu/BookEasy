import Hotel from "../models/Hotel.js";
import { errorMessage } from "../errorMessage.js";

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(201).json(saveHotel);
  } catch (error) {
    next(errorMessage(400, "無法創建飯店資料，請檢查輸入格式是否正確", error));
  }
};

// 查找特定飯店資料
const getHotel = async (req, res, next) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return next(errorMessage(404, "找不到指定飯店的資料", null));
    }
    res.status(200).json(hotel);
  } catch (error) {
    next(errorMessage(400, "無效的飯店ID格式", error));
  }
};

// 取得所有飯店資料
const getAllHotels = async (req, res, next) => {
  try {
    let filters = {}; // 初始化篩選條件

    // 取得 query 參數
    const { popularHotel, type, city } = req.query;

    // 篩選熱門飯店
    if (popularHotel) {
      filters.popularHotel = popularHotel === "true"; // 確保轉換為 Boolean
    }

    // 篩選特定類型 (支援多種類型)
    if (type) {
      filters.type = { $in: type.split(",") };
    }

    // 篩選特定城市 (支援多個城市)
    if (city) {
      filters.city = { $in: city.split(",") };
    }

    const hotels = await Hotel.find(filters);
    res.status(200).json(hotels);
  } catch (error) {
    next(errorMessage(400, "取得飯店資料失敗", error));
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
      return next(errorMessage(404, "找不到要更新的飯店資料", null));
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

// 取得不同類型飯店的數量，支援多種類型篩選
const amountOfType = async (req, res, next) => {
  try {
    let types = req.query.type;

    // 確保 types 是陣列 (若為字串則拆分)
    if (types) {
      types = types.split(",");
    }

    let matchStage = {}; // 預設不篩選類型
    if (types && types.length > 0) {
      matchStage = { type: { $in: types } };
    }

    const hotelTypeCount = await Hotel.aggregate([
      { $match: matchStage }, // 根據類型篩選
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(hotelTypeCount);
  } catch (error) {
    next(errorMessage(400, "取得飯店類型數量失敗", error));
  }
};

// 取得不同城市的飯店數量，支援多個城市篩選
const amountOfCities = async (req, res, next) => {
  try {
    let cities = req.query.city;

    // 確保 cities 是陣列 (若為字串則拆分)
    if (cities) {
      cities = cities.split(",");
    }

    let matchStage = {}; // 預設不篩選
    if (cities && cities.length > 0) {
      matchStage = { city: { $in: cities } };
    }

    const hotelCityCount = await Hotel.aggregate([
      { $match: matchStage }, // 根據城市篩選
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(hotelCityCount);
  } catch (error) {
    next(errorMessage(400, "取得飯店城市數量失敗", error));
  }
};

export {
  createHotel,
  getHotel,
  getAllHotels,
  updatedHotel,
  deleteHotel,
  amountOfType,
  amountOfCities,
};
