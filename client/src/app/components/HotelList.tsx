"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import zhTW from "date-fns/locale/zh-TW";

import SearchItem from "./SearchItem";

interface SelectionRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

const icons = {
  calendar: faCalendarAlt,
};

const HotelList = () => {
  const searchParams = useSearchParams();

  const destination = searchParams.get("destination") || "";
  const dateRange = searchParams.get("dateRange") || "";
  const guests = searchParams.get("guests") || "";

  const [adults, children, rooms] = guests.split(",").map(Number);

  const [isOpen, setIsOpen] = useState(false);
  const [dateRangeText, setDateRangeText] = useState("");

  const [selectionRange, setSelectionRange] = useState<SelectionRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;

    if (startDate && endDate) {
      setSelectionRange({
        startDate: startDate,
        endDate: endDate,
        key: "selection",
      });
      setDateRangeText(
        `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 p-4 text-white text-lg font-semibold">
                搜尋
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    目的地/住宿名稱：
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="要去哪裡？"
                    value={destination}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    入住/退房日期：
                  </label>
                  <div className="relative" ref={datePickerRef}>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <FontAwesomeIcon
                        icon={icons.calendar}
                        className="text-gray-400 w-4 h-4 ml-4 mr-2"
                        onClick={() => setIsOpen(!isOpen)}
                      />
                      <input
                        type="text"
                        value={dateRange}
                        onClick={() => setIsOpen(!isOpen)}
                        readOnly
                        className="w-full pl-2 pr-3 py-2 focus:outline-none text-gray-500 rounded-md"
                        placeholder="選擇日期區間"
                      />
                    </div>
                    {isOpen && (
                      <div className="absolute z-10 mt-1">
                        <DateRange
                          editableDateInputs={true}
                          ranges={[selectionRange]}
                          onChange={handleSelect}
                          moveRangeOnFirstSelection={false}
                          minDate={new Date()}
                          locale={zhTW}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    每晚價格範圍：
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="最低"
                    />
                    <input
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      placeholder="最高"
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {`${adults}位成人 · ${children}位小孩 · ${rooms}間房間`}
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                  搜尋
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  在台北找到505間房間
                </h2>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                  在地圖上顯示
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <SearchItem active="active" />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
              <SearchItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
