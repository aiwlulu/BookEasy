"use client";

import React from "react";
import Categories from "./Categories";
import PopularHotels from "./PopularHotels";
import PostCards from "./PostCards";
import {
  CategoriesCities,
  CategoriesType,
  Attractions,
  PopularHotelsData,
} from "../../data";
import useFetch from "../../../hooks/useFetch";

const Feature: React.FC = () => {
  const { data, loading, error } = useFetch("/hotels");
  return (
    <div className="w-full flex justify-center max-w-screen-lg mx-auto">
      <div className="w-full">
        <div className="p-4">
          <h2>依住宿類型瀏覽</h2>
        </div>
        <div className="flex gap-4 overflow-x-scroll p-4">
          <Categories dataArray={CategoriesType} />
        </div>
        <div className="mx-auto px-4 mt-10 mb-4">
          <PostCards dataArray={Attractions} />
        </div>
        <div className="p-4">
          <h3>探索臺灣</h3>
          <p>這些熱門目的地魅力無窮，等你來體驗！</p>
        </div>
        <div className="flex gap-4 overflow-x-scroll p-4">
          <Categories dataArray={CategoriesCities} />
        </div>
        <div className="mt-4">
          <h2 className="px-4">人氣民宿、公寓類型住宿</h2>
          <div className="flex gap-4 overflow-x-scroll p-4">
            <PopularHotels dataArray={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
