import { fetchData, SanityReturnData } from "@/lib/sanity/httpSanity";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface DataContextProps {
  data: SanityReturnData[];
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<SanityReturnData[]>([]);

  useEffect(() => {
    fetchData().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

export const useData = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDishes must be used within a DishesProvider");
  }
  return context;
};
