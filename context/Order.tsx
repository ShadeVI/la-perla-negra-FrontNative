import { SanityReturnData } from "@/lib/sanity/httpSanity";
import { createContext, useContext, useReducer } from "react";

export enum ORDER_REDUCER_TYPES {
  ADD,
  REMOVE,
  RESET,
}

interface OrderProviderProps {
  children: React.ReactNode;
}

interface ContextValue {
  order: { [key: string]: { data: SanityReturnData; sum: number } };
  dispatch: React.Dispatch<{
    payload: SanityReturnData | null;
    type: ORDER_REDUCER_TYPES;
  }>;
}

const INITIAL_CONTEXT_VALUE: ContextValue = {
  order: {},
  dispatch: () => {},
};

const OrderContext = createContext<ContextValue>(INITIAL_CONTEXT_VALUE);

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [order, dispatch] = useReducer(orderReducer, {});

  return (
    <OrderContext.Provider value={{ order, dispatch }}>
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
  state: { [key: string]: { data: SanityReturnData; sum: number } },
  action: { payload: SanityReturnData | null; type: ORDER_REDUCER_TYPES }
) {
  const { payload, type } = action;

  if (!payload || type === ORDER_REDUCER_TYPES.RESET) return {};

  switch (type) {
    case ORDER_REDUCER_TYPES.ADD:
      const newOrderState = { ...state };
      if (state[payload._id]?.sum >= 1) {
        newOrderState[payload._id] = {
          ...newOrderState[payload._id],
          sum: state[payload._id].sum + 1,
        };
      } else {
        newOrderState[payload._id] = {
          data: payload,
          sum: 1,
        };
      }
      return newOrderState;
    case ORDER_REDUCER_TYPES.REMOVE:
      const newRemOrderState = { ...state };
      if (state[payload._id].sum > 1) {
        newRemOrderState[payload._id] = {
          ...newRemOrderState[payload._id],
          sum: state[payload._id].sum - 1,
        };
      } else {
        delete newRemOrderState[payload._id];
      }
      return newRemOrderState;
    default:
      return state;
  }
}
