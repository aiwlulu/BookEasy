import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SearchItemProps {
  active?: string;
}

const SearchItem: React.FC<SearchItemProps> = ({ active }) => {
  return (
    <div
      className={`flex items-center gap-4 border border-lightblue rounded p-4 mb-4 ${
        active ? "bg-blue-200 shadow-lg" : ""
      }`}
    >
      <div className="w-1/4 aspect-square relative rounded overflow-hidden">
        <Image
          className="object-cover"
          src="https://cf.bstatic.com/xdata/images/hotel/square600/347072190.webp?k=74cb5ec7f0ef6a6b424dca16d22b2e0b62c5438fbeef2e9f56bed64167dddbad&o=&s=1"
          alt=""
          layout="fill"
        />
      </div>
      <div className="w-3/4 flex flex-col justify-between">
        <div className="flex justify-between">
          <h2 className="text-xl w-1/2">台南微醺文旅 | 老宅古城 | 漫遊體驗</h2>
          <div className="flex gap-[5px] text-right">
            傑出
            <br />
            1,223則評論
            <button className="flex items-center justify-center text-white text-xl font-bold h-10 w-10 bg-blue-500 rounded-tl-md rounded-tr-md rounded-br-md">
              9.5
            </button>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-blue-500 border-b border-blue-500 text-xs mr-2">
            中西區 台南 400公尺遠
          </span>
          <span className="inline-flex items-center justify-center text-white text-xs font-light p-1 bg-blue-500">
            免費專機接送
          </span>

          <div className="mt-4 flex justify-between items-end">
            <div className="border-l-4 border-gray-300 pl-2 text-xs">
              <div>
                <b>標準單人房－附共用衛浴</b>
                <br />
                <b>一張單人床</b>
              </div>
              <div className="mt-2 text-green-600">
                <b>✔️ 免費取消</b>
                <b>立即搶下優惠價－可取消</b>
                <br />
                <b className="text-red-600">此價格的客房在本站僅剩 1 間</b>
              </div>
            </div>
            <div className="text-xs flex flex-col items-end">
              <span>五晚、1位</span>
              <span className="text-xl font-medium">TWD 4534</span>
              <span className="text-gray-500">含稅費與其他費用</span>
              <Link href="/hotels/1" passHref>
                <button className="mt-2 w-full text-white text-lg py-2 px-4 bg-blue-500 rounded hover:bg-blue-400 transition-colors duration-300">
                  查看客房供應情況
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
