"use client";
import { LoginContextProvider } from "../context/LoginContext";
import { OptionsProvider } from "../context/OptionsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoginContextProvider>
      <OptionsProvider>{children}</OptionsProvider>
    </LoginContextProvider>
  );
}
