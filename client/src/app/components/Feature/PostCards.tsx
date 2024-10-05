import React from "react";
import Image from "next/image";

type PostCardsProps = {
  dataArray: { img: string; name: string; flag: string; amount: string }[];
};

const PostCards: React.FC<PostCardsProps> = ({ dataArray }) => {
  return (
    <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-4">
      {dataArray.slice(0, 2).map((item, index) => (
        <div
          className="relative flex items-center justify-center aspect-video"
          key={index}
        >
          <Image
            src={item.img}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
          <div className="absolute top-2 left-4 text-white">
            <div className="flex items-center space-x-2">
              <h2 className="text-shadow">{item.name}</h2>
              <Image src={item.flag} alt={item.name} width={20} height={15} />
            </div>
            <p className="text-shadow">{item.amount}</p>
          </div>
        </div>
      ))}
      <div className="grid grid-cols-3 gap-4 col-span-2">
        {dataArray.slice(2, 5).map((item, index) => (
          <div
            className="relative flex items-center justify-center overflow-hidden aspect-[5/3]"
            key={index}
          >
            <Image
              src={item.img}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
            <div className="absolute top-2 left-4 text-white">
              <div className="flex items-center space-x-2">
                <h2 className="text-shadow">{item.name}</h2>
                <Image src={item.flag} alt={item.name} width={20} height={15} />
              </div>
              <p className="text-shadow">{item.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCards;
