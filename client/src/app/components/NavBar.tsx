"use client";
import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
  faToriiGate,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { LoginContext } from "../../context/LoginContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { logout } from "../../constants/actionType";

const options = [
  { id: "stay", icon: faBed, label: "住宿" },
  { id: "flights", icon: faPlane, label: "航班" },
  { id: "car-rental", icon: faCar, label: "租車" },
  { id: "attractions", icon: faToriiGate, label: "景點/活動" },
  { id: "airport-taxi", icon: faTaxi, label: "機場計程車" },
];

interface NavbarButtonProps {
  id: string;
  icon: IconDefinition;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({
  id,
  icon,
  label,
  active,
  onClick,
}) => (
  <button
    className={`flex items-center gap-2.5 rounded-full px-4 py-2 hover:bg-white hover:bg-opacity-10 whitespace-pre cursor-pointer ${
      active ? "border border-white bg-white bg-opacity-10" : ""
    }`}
    onClick={onClick}
    aria-pressed={active}
    aria-label={label}
  >
    <FontAwesomeIcon icon={icon} className="w-4" />
    <span>{label}</span>
  </button>
);

const Navbar: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>("stay");
  const { user, dispatch } = useContext(LoginContext);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout", {}, { withCredentials: true });
      dispatch({ type: logout });
      localStorage.removeItem("user");
      router.push("/login");
    } catch (err) {
      console.error("❌ 登出失敗:", err);
    }
  };

  return (
    <div className="w-full h-40 mx-auto bg-blue-500 text-white flex justify-center">
      <div className="w-11/12 h-full max-w-screen-lg">
        <div className="flex h-1/2 items-center justify-between">
          <Link href="/" className="text-xl cursor-pointer">
            BOOKEASY
          </Link>

          <div className="flex items-center gap-4">
            <button
              aria-label="切換語言"
              className="rounded-full h-[30px] w-[30px] border-none bg-[url('https://q-xx.bstatic.com/backend_static/common/flags/new/48-squared/tw.png')] bg-cover"
            />
            {!mounted ? (
              // 🔵 Skeleton Loading（載入中）
              <div className="flex items-center gap-4 animate-pulse">
                <div className="h-8 w-16 bg-gray-300 rounded-md"></div>
                <div className="h-8 w-16 bg-gray-300 rounded-md"></div>
              </div>
            ) : user ? (
              // ✅ 已登入：顯示 username + 登出按鈕
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm px-4 py-2 bg-white text-blue-500 hover:bg-gray-200"
                >
                  登出
                </button>
              </div>
            ) : (
              // ❌ 未登入：顯示註冊 & 登入按鈕
              <>
                <Link
                  href="/register"
                  className="text-sm px-4 py-2 bg-white text-blue-500 hover:bg-gray-200"
                >
                  註冊
                </Link>
                <Link
                  href="/login"
                  className="text-sm px-4 py-2 bg-white text-blue-500 hover:bg-gray-200"
                >
                  登入
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex h-1/2 items-start gap-5">
          {options.map((option) => (
            <NavbarButton
              key={option.id}
              id={option.id}
              icon={option.icon}
              label={option.label}
              active={option.id === activeId}
              onClick={() => setActiveId(option.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
