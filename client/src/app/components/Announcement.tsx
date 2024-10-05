import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface AnnouncementProps {
  type: "Upper half" | "Lower half";
}

const UpperHalfContent: React.FC = () => (
  <>
    <div className="flex items-center h-24">
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
        className="h-5 w-5 mr-1.5"
        aria-label="差旅行程"
      />
      <span>此為差旅行程</span>
    </div>
    <div className="border border-gray-300 h-20 flex items-center px-5">
      <div className="flex justify-center items-center mr-4 bg-orange-100 w-8 h-8">
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="text-yellow-500 w-6 h-6"
        />
      </div>
      <span>
        獲得所需建議。在出發之前，查看最新的新冠肺炎（COVID-19）相關限制。
      </span>
    </div>
    <div className="my-5 flex gap-4 items-center border border-gray-100 rounded-md p-6 shadow-md">
      <div className="w-36 mr-4">
        <Image
          src="https://r-xx.bstatic.com/data/mm/index_banner_getaway22_summer_2.jpg"
          alt="Discount Banner"
          width={150}
          height={160}
          className="w-full"
        />
      </div>
      <div className="flex flex-col justify-center gap-3">
        <h2>省 15% 或更多</h2>
        <span className="text-gray-700 leading-relaxed">
          這個夏天，讓夢想之旅成真！2025 年 3 月 31 日前預訂並住房就可省一筆
        </span>
        <button
          className="w-28 py-2 text-white bg-blue-500 hover:bg-blue-700 transition-colors duration-300 border-none rounded-sm"
          aria-label="逛逛優惠"
        >
          逛逛優惠
        </button>
      </div>
    </div>
  </>
);

const LowerHalfContent: React.FC = () => (
  <div className="relative my-8 flex items-center rounded-md h-52 p-1.5 border border-gray-300">
    <Image
      src="https://cf.bstatic.com/static/img/genius-banner-world-bg/2b5cdbad7b92073bc396b8b59d0bb421b3a01cba.png"
      alt="Background Image"
      layout="fill"
      objectFit="cover"
      objectPosition="right"
      className="rounded-md"
    />
    <div className="relative z-10 flex items-center">
      <Image
        src="https://cf.bstatic.com/static/img/genius-globe-with-badge_desktop@2x/1f5a273d871549f00bf6692f7ff612b5e8eda038.png"
        alt="Genius Banner"
        width={180}
        height={200}
        className="w-45"
      />
      <div className="flex flex-col gap-5 ml-5">
        <h2>優惠立即享</h2>
        <span>登入您的帳戶，尋找藍色的 Genius Icon，輕鬆省一筆</span>
        <div className="flex gap-2.5">
          <button
            className="py-2 px-3.5 rounded-sm text-blue-600 border border-blue-600 bg-white hover:bg-blue-100"
            aria-label="登入"
          >
            登入
          </button>
          <button
            className="py-2 px-3.5 rounded-sm text-blue-600 hover:bg-blue-100 bg-white"
            aria-label="註冊"
          >
            註冊
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Announcement: React.FC<AnnouncementProps> = ({ type }) => {
  return (
    <div className="mt-12 max-w-screen-lg mx-auto">
      <div className="px-5">
        {type === "Upper half" ? <UpperHalfContent /> : <LowerHalfContent />}
      </div>
    </div>
  );
};

export default Announcement;
