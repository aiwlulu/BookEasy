"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Navbar from "../components/NavBar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoginContext } from "../../context/LoginContext";
import { login_success } from "../../constants/actionType";

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const { user, dispatch } = useContext(LoginContext);
  const [loginData, setLoginData] = useState({
    account: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setLoginData({
        account: user.username || "",
        password: user.password || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "/api/v1/auth/login",
        { account: loginData.account, password: loginData.password },
        { withCredentials: true }
      );

      const username = res.data.split(" ")[0];

      const userData = { username };

      dispatch({ type: login_success, payload: userData });

      localStorage.setItem("user", JSON.stringify(userData));

      router.push("/");
    } catch (err: any) {
      console.error("❌ 登入錯誤:", err.response?.data || err);
      setError(err.response?.data?.message || "登入失敗");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              登入帳戶
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleClick}>
            <div className="space-y-4 rounded-md">
              <div>
                <label htmlFor="account" className="sr-only">
                  帳號或信箱
                </label>
                <input
                  id="account"
                  name="account"
                  type="text"
                  required
                  className="relative block w-full rounded-md border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                  placeholder="帳號或信箱"
                  value={loginData.account}
                  onChange={handleChange}
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
                  value={loginData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-blue-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                登入
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link
              href="/register"
              className="text-sm text-gray-600 hover:text-blue-500"
            >
              還沒有帳號？按這裡註冊
            </Link>
            <br />
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
