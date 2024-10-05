"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import zhTW from "date-fns/locale/zh-TW";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
interface SelectionRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

const icons = {
  search: faSearch,
  calendar: faCalendarAlt,
  user: faUser,
};

const SearchBar = () => {
  const [destination, setDestination] = useState("");
  const [selectionRange, setSelectionRange] = useState<SelectionRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [openGuests, setOpenGuests] = useState(false);
  const [guests, setGuests] = useState("1 位成人 · 0 位小孩 · 1 間房");
  const [dateRangeText, setDateRangeText] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const datePickerRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    setGuests(`${adults} 位成人 · ${children} 位小孩 · ${rooms} 間房`);
  }, [adults, children, rooms]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
    if (
      guestsRef.current &&
      !guestsRef.current.contains(event.target as Node)
    ) {
      setOpenGuests(false);
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

  const handleGuestsChange = (
    type: "adults" | "children" | "rooms",
    operation: "increase" | "decrease"
  ) => {
    const setter =
      type === "adults"
        ? setAdults
        : type === "children"
        ? setChildren
        : setRooms;
    const value =
      type === "adults" ? adults : type === "children" ? children : rooms;

    if (operation === "increase") {
      setter((prev) => prev + 1);
    } else if (value > 1 || (type === "children" && value > 0)) {
      setter((prev) => prev - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = DOMPurify.sanitize(e.target.value);
    setDestination(sanitizedInput);
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      destination,
      dateRange: dateRangeText,
      guests: `${adults},${children},${rooms}`,
    });
    router.push(`/hotelList?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 border border-gray-300 absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 w-full max-w-screen-lg">
      <div className="flex-1 flex items-center border border-gray-300 rounded-md">
        <FontAwesomeIcon
          icon={icons.search}
          className="text-gray-400 w-5 h-4 ml-4 mr-2"
        />
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={handleInputChange}
          className="w-full pl-2 pr-3 py-2 focus:outline-none text-gray-500 rounded-md"
          placeholder="你要去哪裡？"
        />
      </div>

      <div className="flex-1 min-w-[200px] relative" ref={datePickerRef}>
        <div className="flex items-center border border-gray-300 rounded-md">
          <FontAwesomeIcon
            icon={icons.calendar}
            className="text-gray-400 w-4 h-4 ml-4 mr-2"
            onClick={() => setIsOpen(!isOpen)}
          />
          <input
            type="text"
            value={dateRangeText}
            onClick={() => setIsOpen(!isOpen)}
            readOnly
            className="w-full pl-2 pr-3 py-2 focus:outline-none text-gray-500 rounded-md"
            placeholder="選擇日期區間"
          />
        </div>
        {isOpen && (
          <div className="absolute z-10">
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

      <div
        className="flex items-center border border-gray-300 rounded-md cursor-pointer w-72"
        onClick={() => setOpenGuests(!openGuests)}
      >
        <FontAwesomeIcon
          icon={icons.user}
          className="text-gray-400 w-4 h-4 ml-4 mr-2 flex-shrink-0"
        />
        <div className="pl-2 pr-3 py-2 text-gray-400 truncate">{guests}</div>
      </div>
      {openGuests && (
        <div
          className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-20 p-4 w-64"
          ref={guestsRef}
        >
          {["adults", "children", "rooms"].map((type, index) => (
            <div key={type}>
              <div
                className={`flex items-center justify-between ${
                  index !== 2 ? "mb-4" : ""
                }`}
              >
                <div className="text-gray-500">
                  {type === "adults"
                    ? "成人"
                    : type === "children"
                    ? "小孩"
                    : "房間"}
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleGuestsChange(
                        type as "adults" | "children" | "rooms",
                        "decrease"
                      )
                    }
                    className="px-2 py-1 border border-blue-300 rounded-md text-gray-400"
                  >
                    -
                  </button>
                  <div className="mx-5 w-8 text-center text-gray-500">
                    {type === "adults"
                      ? adults
                      : type === "children"
                      ? children
                      : rooms}
                  </div>
                  <button
                    onClick={() =>
                      handleGuestsChange(
                        type as "adults" | "children" | "rooms",
                        "increase"
                      )
                    }
                    className="px-2 py-1 border border-blue-300 rounded-md text-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
              {type === "children" && (
                <div className="text-xs text-gray-400 mb-4">0-17歲</div>
              )}
            </div>
          ))}
        </div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-300 min-w-[120px]"
        onClick={handleSearch}
      >
        搜尋
      </button>
    </div>
  );
};

export default SearchBar;
