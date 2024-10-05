import React from "react";
import Categories from "./Categories";
import PostCards from "./PostCards";
import { CategoriesCities, CategoriesType, Attractions } from "../../data";

const Feature: React.FC = () => {
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
      </div>
    </div>
  );
};

export default Feature;
