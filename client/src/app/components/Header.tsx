import React from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-6 px-4 relative">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="mb-2">尋找下趟住宿</h1>
        <p className="mb-10">
          搜尋飯店、民宿及其他住宿類型的優惠...
          <br />
          Booking.com clone 挑戰（參考 SamKo Demo，不為盈利）
        </p>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
