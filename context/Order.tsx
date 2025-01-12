import { SanityReturnData } from "@/lib/sanity/httpSanity";
import { createContext, useContext, useReducer } from "react";

export enum ORDER_REDUCER_TYPES {
  ADD,
  REMOVE,
}

interface OrderProviderProps {
  children: React.ReactNode;
}

interface ContextValue {
  orders: SanityReturnData[];
  dispatch: React.Dispatch<{
    payload: SanityReturnData;
    type: ORDER_REDUCER_TYPES;
  }>;
}

const INITIAL_CONTEXT_VALUE: ContextValue = {
  orders: [],
  dispatch: () => {},
};

const OrderContext = createContext<ContextValue>(INITIAL_CONTEXT_VALUE);

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orders, dispatch] = useReducer(orderReducer, []);

  return (
    <OrderContext.Provider value={{ orders, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
};

function orderReducer(
  state: SanityReturnData[],
  action: { payload: SanityReturnData; type: ORDER_REDUCER_TYPES }
) {
  const { payload, type } = action;
  switch (type) {
    case ORDER_REDUCER_TYPES.ADD:
      return [...state, payload];
    case ORDER_REDUCER_TYPES.REMOVE:
      const positionElementToRemove = state.indexOf(payload);
      const newOrderState = state.toSpliced(positionElementToRemove, 1);
      return newOrderState;
    default:
      return state;
  }
}
