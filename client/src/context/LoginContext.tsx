"use client";
import React, {
  createContext,
  useEffect,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";
import axios from "axios";
import {
  login_failure,
  login_success,
  logout,
  start_login,
} from "../constants/actionType";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface LoginState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface LoginAction {
  type: string;
  payload?: any;
}

interface LoginContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  dispatch: Dispatch<LoginAction>;
}

const storedUsername =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")?.username || null
    : null;

const INITIAL_STATE: LoginState = {
  user: storedUsername ? ({ username: storedUsername } as User) : null,
  loading: false,
  error: null,
};

export const LoginContext = createContext<LoginContextType>({
  user: null,
  loading: false,
  error: null,
  dispatch: () => {},
});

const LoginReducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case start_login:
      return { user: null, loading: true, error: null };
    case login_success:
      return { user: action.payload, loading: false, error: null };
    case login_failure:
      return { user: null, loading: false, error: action.payload };
    case logout:
      return { user: null, loading: false, error: null };
    default:
      return state;
  }
};

export const LoginContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE);

  useEffect(() => {
    const verifyToken = async () => {
      if (!state.user) return;

      try {
        const res = await axios.get("/api/v1/auth/verify", {
          withCredentials: true,
        });
        if (res.status !== 200) throw new Error("JWT 無效");

        dispatch({ type: login_success, payload: res.data });
      } catch (err) {
        console.error("❌ JWT 過期，請重新登入");
        dispatch({ type: logout });
        localStorage.removeItem("user");
      }
    };

    verifyToken();
  }, []);

  // logout 時清除 localStorage
  useEffect(() => {
    if (!state.user) {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <LoginContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
