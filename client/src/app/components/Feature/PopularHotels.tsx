import React from "react";
import Image from "next/image";

type PopularHotelsProps = {
  dataArray: {
    id: number;
    photos: string;
    name: string;
    city: string;
    comments: number;
    cheapestPrice: number;
    rating: number;
  }[];
};

const PopularHotels: React.FC<PopularHotelsProps> = ({ dataArray }) => {
  return (
    <div className="flex gap-[15px]">
      {dataArray.map((item) => (
        <div className="flex-shrink-0" key={item.id}>
          <div className="relative w-[250px] h-[230px]">
            <Image
              src={item.photos[0]}
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded flex"
            />
          </div>

          <div className="itemInfo">
            <div>{item.name}</div>
            <div className="text-gray-500 text-xs">{item.city}</div>
            <div className="text-black font-medium py-[2px]">
              TWD {item.cheapestPrice.toLocaleString()} 起
            </div>
            <div className="flex items-center gap-[5px]">
              <button className="flex items-center justify-center bg-blue-500 text-white text-base font-bold h-[30px] w-[30px] rounded-[5px] rounded-bl-none">
                {item.rating}
              </button>
              <span className="text-black">
                {item.rating >= 9.5 ? "好極了" : "傑出"}
              </span>
              <p className="text-xs text-gray-500">
                {item.comments.toLocaleString()}則
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularHotels;
