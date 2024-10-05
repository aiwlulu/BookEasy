import React from "react";

const Footer: React.FC = () => {
  const links = [
    { id: "mobile", label: "手機版" },
    { id: "account", label: "您的帳戶" },
    { id: "order", label: "線上修改訂單" },
    { id: "support", label: "客服支援" },
    { id: "business", label: "Booking.com 企業差旅服務" },
  ];

  return (
    <div className="mt-12 flex flex-col items-center bg-blue-800">
      <div className="text-center text-white font-light mt-5">
        <div className="text-2xl pt-4">
          省時又省錢!
          <span className="block text-gray-100 text-base mt-2">
            現在訂閱，我們將寄送最佳訂房優惠給您。
          </span>
        </div>
      </div>
      <div className="w-full max-w-4xl p-5">
        <div className="flex items-center px-12">
          <input
            className="flex-grow border-none rounded-md h-12 p-4 text-lg mr-4"
            type="email"
            placeholder="您的電子郵件"
          />
          <button className="w-1/4 h-12 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white rounded-md text-lg">
            訂閱!
          </button>
        </div>
        <div className="flex items-center px-12 my-4">
          <input type="checkbox" id="checkbox" className="mr-2" />
          <label htmlFor="checkbox" className="text-white">
            請發送 Booking.com 免費 App 下載連結給我！
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-48 bg-blue-900 gap-5">
        <button className="w-36 h-12 border border-white text-white rounded-md flex items-center justify-center hover:text-blue-300 mb-2">
          將你的住宿註冊
        </button>
        <hr className="w-full border-blue-800" />
        <ul className="flex gap-5 text-white">
          {links.map((link) => (
            <li key={link.id} className="hover:text-blue-300 cursor-pointer">
              {link.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
