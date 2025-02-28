"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/NavBar";
import axios from "axios";
import { useRouter } from "next/navigation";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface CheckPassword {
  checkpassword: string;
}

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [registerData, setRegisterData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
  });
  const [checkpassword, setPassword] = useState<CheckPassword>({
    checkpassword: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", registerData);
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "註冊失敗");
    }
  };

  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    if (checkpassword.checkpassword !== registerData.password) {
      setError("密碼輸入不一樣");
    } else {
      setError("");
    }
  }, [checkpassword, registerData.password]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              註冊帳戶
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md">
              <div>
                <label htmlFor="username" className="sr-only">
                  使用者名稱
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                  placeholder="使用者名稱"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  帳號信箱
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                  placeholder="帳號信箱"
                  onChange={handleChange}
                  style={
                    error === "錯誤，此帳號或信箱已被註冊"
                      ? { outline: "2px solid red" }
                      : {}
                  }
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  密碼
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                  placeholder="密碼"
                  onChange={handleChange}
                  style={
                    error === "密碼輸入不一樣"
                      ? { outline: "2px solid red" }
                      : {}
                  }
                />
              </div>
              <div>
                <label htmlFor="checkpassword" className="sr-only">
                  確認密碼
                </label>
                <input
                  id="checkpassword"
                  name="checkpassword"
                  type="password"
                  required
                  className="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                  placeholder="確認密碼"
                  onChange={handleCheckPassword}
                  style={
                    error === "密碼輸入不一樣"
                      ? { outline: "2px solid red" }
                      : {}
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-blue-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                onClick={handleClick}
              >
                註冊
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-blue-500"
            >
              已有帳號？按這裡登入
            </Link>
            <br />
            {error && (
              <span className="text-sm text-red-600 hover:text-blue-500">
                {error}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
