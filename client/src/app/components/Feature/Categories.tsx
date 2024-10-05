import React from "react";
import Image from "next/image";

type CategoriesProps = {
  dataArray: { id: number; img: string; name: string; amount: string }[];
};

const Categories: React.FC<CategoriesProps> = ({ dataArray }) => {
  return (
    <>
      {dataArray.map((item) => (
        <div className="flex-shrink-0 w-[200px]" key={item.id}>
          <div className="relative w-full h-36">
            <Image
              src={item.img}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
          <div className="py-2">
            <div className="font-bold">{item.name}</div>
            <div className="text-gray-500">{item.amount}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Categories;
