"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface Options {
  adult: number;
  children: number;
  room: number;
}

interface OptionsState {
  city: string;
  options: { adult: number; children: number; room: number };
  date: { startDate: Date; endDate: Date };
  setCity: (city: string) => void;
  setOptions: Dispatch<SetStateAction<Options>>;
  setDate: (date: { startDate: Date; endDate: Date }) => void;
}

const OptionsContext = createContext<OptionsState | undefined>(undefined);

export const OptionsProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState("");
  const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <OptionsContext.Provider
      value={{ city, options, date, setCity, setOptions, setDate }}
    >
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptions = () => {
  const context = useContext(OptionsContext);
  if (!context) {
    throw new Error("useOptions must be used within an OptionsProvider");
  }
  return context;
};
