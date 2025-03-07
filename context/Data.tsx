import {
  Category,
  fetchCategories,
  fetchData,
  SanityReturnData,
} from "@/lib/sanity/httpSanity";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface DataContextProps {
  data: SanityReturnData[];
  categories: Category[];
  isLoading: boolean;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<SanityReturnData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([fetchCategories(), fetchData()])
      .then((res) => {
        setCategories(
          res[0].sort((a, b) => a.identifierNumber - b.identifierNumber)
        );
        setData(res[1]);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <DataContext.Provider value={{ data, categories, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDishes must be used within a DishesProvider");
  }
  return context;
};
