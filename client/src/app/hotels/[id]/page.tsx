"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPeopleGroup,
  faHeartCircleCheck,
  faWifi,
  faSmokingBan,
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";

const HotelPage: React.FC = () => {
  const comments = useRef<HTMLDivElement | null>(null);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const images = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const openGallery = (index: number) => {
    setActiveImage(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    setActiveImage(null);
  };

  const nextImage = () => {
    if (activeImage !== null) {
      // go to the first image if it's the last one
      setActiveImage((activeImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (activeImage !== null) {
      // go to the last image if it's the first one
      setActiveImage(activeImage === 0 ? images.length - 1 : activeImage - 1);
    }
  };

  const handleHover = () => {
    if (comments.current) {
      gsap.to(comments.current, {
        opacity: 1,
        ease: "power3.inOut",
        duration: 0.5,
        pointerEvents: "auto",
      });
    }
  };

  const handleHoverExit = () => {
    if (comments.current) {
      gsap.to(comments.current, {
        opacity: 0,
        ease: "power3.inOut",
        duration: 0.5,
        pointerEvents: "none", // disable click events
      });
    }
  };

  return (
    <>
      {/* hotel page */}
      <NavBar />
      <div className="container mx-auto py-6 px-4">
        {/* buttons */}
        <div className="flex justify-start space-x-4 mb-4">
          <button className="px-4 py-2 rounded text-blue-700 bg-blue-200 hover:bg-blue-300">
            資訊 & 房價
          </button>
          <button className="px-4 py-2 rounded text-blue-700 bg-blue-200 hover:bg-blue-300">
            設施
          </button>
          <button className="px-4 py-2 rounded text-blue-700 bg-blue-200 hover:bg-blue-300">
            訂房須知
          </button>
          <button className="px-4 py-2 rounded text-blue-700 bg-blue-200 hover:bg-blue-300">
            房客評價
          </button>
        </div>

        {/* hotel header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                飯店
              </span>
              <h1 className="text-xl font-bold text-gray-900">一中宿喜</h1>

              <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mr-2">
                  <FontAwesomeIcon
                    icon={faPeopleGroup}
                    className="text-blue-800 w-4 h-4"
                    size="sm"
                  />
                </div>
                推薦四人住宿
              </div>
            </div>

            <p className="text-sm text-gray-600 flex items-center mt-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                size="sm"
                className="mr-1 text-red-500 w-4 h-4"
              />
              台中中區三民路二段149巷8-1號3樓－1
              <a
                href="#"
                className="text-blue-500 ml-2 underline-offset-4 hover:underline"
              >
                地理位置超棒－顯示地圖
              </a>
            </p>
          </div>

          <div className="flex flex-col items-end">
            <button className="text-white py-2 px-4 rounded bg-blue-600 hover:bg-blue-700">
              現在就預訂
            </button>

            <div className="flex items-center mt-2 ml-auto">
              <FontAwesomeIcon
                icon={faHeartCircleCheck}
                size="sm"
                className="mr-1 text-red-500 w-4 h-4"
              />
              <span className="text-sm text-gray-800">買貴退差價</span>
            </div>
          </div>
        </div>

        {/* hotel images */}
        <div className="grid grid-cols-3 gap-3 relative">
          {images.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className={`relative cursor-pointer ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverExit}
              onClick={() => openGallery(index)}
            >
              <Image
                src={item.src}
                alt={`Hotel Image ${index + 1}`}
                width={600}
                height={400}
                className="w-full h-full object-cover rounded"
              />

              {/* comments */}
              {index === 0 && (
                <div
                  ref={comments}
                  className="absolute top-4 left-4 w-auto p-2 bg-white shadow-lg rounded opacity-0 pointer-events-none"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white font-bold text-lg p-2 rounded">
                      9.5
                    </div>
                    <div className="ml-2">
                      <p className="font-bold">傑出</p>
                      <p className="text-sm">1,223 則評論</p>
                    </div>
                  </div>
                </div>
              )}

              {index === 5 && images.length > 6 && (
                <div className="more-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl">
                  +{images.length - 6} 張照片
                </div>
              )}
            </div>
          ))}
        </div>

        {/* gallery modal */}
        {isGalleryOpen && activeImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative bg-white w-full max-w-4xl px-4 pt-4 pb-8 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">一中宿喜</h2>
                <button
                  className="text-gray-700 text-xl"
                  onClick={closeGallery}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <hr className="border-t-2 border-gray-200 pt-2 pb-4" />

              <div className="relative flex items-center justify-center">
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-700 text-xl bg-white bg-opacity-50 rounded-full py-[3px] px-[9px] hover:bg-opacity-100"
                  onClick={prevImage}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <Image
                  src={images[activeImage].src}
                  alt={`Active Image ${activeImage + 1}`}
                  width={800}
                  height={600}
                  className="object-cover rounded-lg"
                />
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-700 text-xl bg-white bg-opacity-50 rounded-full py-[3px] px-[9px] hover:bg-opacity-100"
                  onClick={nextImage}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* hotel description */}
        <div className="flex justify-between">
          <div className="w-3/4 mt-6">
            <div className="text-blue-500 font-bold text-2xl mb-2">
              一中宿喜 (旅館)（臺灣台中）
            </div>
            <p className="text-gray-800 leading-7">
              Adagio Hostel 位置超讚，位於台中的中區，距離台灣美術館 2.5
              公里，距離廣三 SOGO 百貨 2.6 公里，距離逢甲夜市 6.5 公里。
              這間住宿距離大慶火車站約 10 公里，距離台中孔廟約 1.8
              公里，距離中正公園約 1.9 公里。這間住宿距離台中火車站 1.1
              公里，距離市中心 200 公尺。
              所有客房均提供空調、衛星頻道平面電視、冰箱、電熱水壺、淋浴設施、免費盥洗用品和書桌。Adagio
              Hostel 的客房設有私人衛浴，且提供吹風機，並可使用免費 WiFi。
              部分客房設有陽台。這間住宿的每間客房都提供寢具和毛巾。Adagio
              Hostel
              附近的人氣景點包括台中公園、台中市政府大樓和南天宮。最近的機場是台中國際機場，距離
              Adagio Hostel 13 公里。
            </p>
            <div className="mt-4 text-gray-800">
              <div className="text-blue-500 font-bold text-2xl mt-6 mb-2">
                熱門設施
              </div>
              <hr className="border-t-2 border-gray-200 pb-4" />
              <ul className="flex space-x-4">
                <li className="flex items-center">
                  <FontAwesomeIcon
                    icon={faWifi}
                    className="mr-2 text-blue-600 w-4 h-4"
                    size="sm"
                  />
                  免費無線網路
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon
                    icon={faSmokingBan}
                    className="mr-2 text-blue-600 w-4 h-4"
                    size="sm"
                  />
                  禁菸客房
                </li>
              </ul>
            </div>
          </div>

          <div className="w-1/4 m-6 bg-blue-100 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-500">住宿特色</h2>
            <p className="text-gray-800 mb-2">
              入住 1 晚的最佳選擇！
              此住宿位於台中評分最高的地區，地理位置評分高達 9.8 分。
              深受獨行旅客歡迎。
            </p>
            <div className="text-xl font-bold text-gray-900">TWD 3,222</div>
            <button className="text-white py-2 px-4 rounded-lg w-full mt-4 bg-blue-600 hover:bg-blue-700">
              現在就預訂
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HotelPage;
