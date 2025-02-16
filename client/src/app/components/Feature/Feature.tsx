"use client";

import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import PopularHotels from "./PopularHotels";
import PostCards from "./PostCards";
import { Attractions } from "../../data";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";

const Feature: React.FC = () => {
  const { data: popularHotelsData } = useFetch("/hotels?popularHotel=true");
  const [categoriesType, setCategoriesType] = useState([]);
  const [categoriesCities, setCategoriesCities] = useState([]);
  const [updatedAttractions, setUpdatedAttractions] = useState(Attractions);

  useEffect(() => {
    const fetchTypeAndCities = async () => {
      try {
        const [typeRes, cityRes] = await Promise.all([
          axios.get("/api/v1/hotels/amountoftype"),
          axios.get("/api/v1/hotels/amountofcities"),
        ]);

        // 建立城市住宿數對照表
        const cityAmountMap = cityRes.data.reduce(
          (
            acc: Record<string, string>,
            item: { _id: string; count: number }
          ) => {
            acc[item._id] = `${item.count} 間住宿`;
            return acc;
          },
          {}
        );

        // 更新 Attractions 的住宿數量
        const updatedAttractionsData = Attractions.map((attr) => ({
          ...attr,
          amount: cityAmountMap[attr.name] || "0 間住宿", // 若找到對應城市則更新，否則設為 0
        }));

        setUpdatedAttractions(updatedAttractionsData);

        // 類型資料
        const updatedCategoriesType = typeRes.data.map(
          (item: { _id: string; count: number }, index: number) => ({
            id: index,
            name: item._id,
            amount: `${item.count} 間住宿`,
            img: getTypeImage(item._id),
          })
        );

        // 城市資料
        const updatedCategoriesCities = cityRes.data.map(
          (item: { _id: string; count: number }, index: number) => ({
            id: index,
            name: item._id,
            amount: `${item.count} 間住宿`,
            img: getCityImage(item._id),
          })
        );

        setCategoriesType(updatedCategoriesType);
        setCategoriesCities(updatedCategoriesCities);
      } catch (error) {
        console.error("獲取類型和城市數據失敗:", error);
      }
    };

    fetchTypeAndCities();
  }, []);

  return (
    <div className="w-full flex justify-center max-w-screen-lg mx-auto">
      <div className="w-full">
        <div className="p-4">
          <h2>依住宿類型瀏覽</h2>
        </div>
        <div className="flex gap-4 overflow-x-scroll p-4">
          <Categories dataArray={categoriesType} />
        </div>
        <div className="mx-auto px-4 mt-10 mb-4">
          <PostCards dataArray={updatedAttractions} />
        </div>
        <div className="p-4">
          <h3>探索臺灣</h3>
          <p>這些熱門目的地魅力無窮，等你來體驗！</p>
        </div>
        <div className="flex gap-4 overflow-x-scroll p-4">
          <Categories dataArray={categoriesCities} />
        </div>
        <div className="mt-4">
          <h2 className="px-4">人氣民宿、公寓類型住宿</h2>
          <div className="flex gap-4 overflow-x-scroll p-4">
            <PopularHotels dataArray={popularHotelsData.slice(0, 7)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const getTypeImage = (type: string): string => {
  const images: Record<string, string> = {
    飯店: "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    公寓: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    度假村:
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    Villa:
      "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
  };

  return images[type] || images["飯店"]; // 預設為「飯店」
};

const getCityImage = (city: string): string => {
  const images: Record<string, string> = {
    台南: "https://cf.bstatic.com/xdata/images/city/square250/687880.webp?k=a8f37ac28f438390034f6492e1ece731900df0f6133050a754123c969d7fc6d8&o=",
    台中: "https://cf.bstatic.com/xdata/images/city/square250/687892.webp?k=0f5cc456997c9fa5b99510dc453534730620c0867d94630639c74b4c18641c71&o=",
    宜蘭縣:
      "https://cf.bstatic.com/xdata/images/region/square250/69956.webp?k=a79c8229fe2b508887961cafe02d79b9c45d42d7d06882f6d150af327e0adcdf&o=",
    花蓮市:
      "https://cf.bstatic.com/xdata/images/city/square250/687822.webp?k=4750fc80f938ae0b7c16d0ac306c30f949c9ad7baba7ab79cfb7940e991849b7&o=",
    台東市:
      "https://cf.bstatic.com/xdata/images/city/square250/687910.webp?k=ddda35cd7e422bfe96ee16fa84d4d63fe71e30fb738df85533c33c5a7365497f&o=",
  };

  return images[city] || images["台南"]; // 預設為「台南」
};

export default Feature;
