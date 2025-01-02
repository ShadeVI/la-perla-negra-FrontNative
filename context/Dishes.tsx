import { Dish, fetchDishes } from "@/lib/sanity/httpSanity";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface DishesContextProps {
  dishes: Dish[];
}

const DishesContext = createContext<DishesContextProps | undefined>(undefined);

export const DishesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    fetchDishes().then((res) => 
      setDishes(res));
  }, []);
 
  return (
    <DishesContext.Provider value={{ dishes }}>
      {children}
    </DishesContext.Provider>
  );
};

export const useDishes = (): DishesContextProps => {
  const context = useContext(DishesContext);
  if (!context) {
    throw new Error("useDishes must be used within a DishesProvider");
  }
  return context;
};
