import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface IChildren {
  children: ReactNode;
}

export type TState = {
  name: string;
  cost: string;
  category: string;
};

type TAction = {
  type: CardAction;
  payload: string;
};

type TContext = {
  state: TState;
  dispatch: (action: TAction) => void;
};

const initialData = {
  name: "",
  cost: "",
  category: "",
};

export const CardContext = createContext<TContext | undefined>(undefined);

export enum CardAction {
  setName,
  setCost,
  setCategory,
}

const CardReducer = (state: TState, action: TAction) => {
  switch (action.type) {
    case CardAction.setName:
      return { ...state, name: action.payload };
    case CardAction.setCost:
      return { ...state, cost: action.payload };
    case CardAction.setCategory:
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

export const CardProvider = ({ children }: IChildren) => {
  const [state, dispatch] = useReducer(CardReducer, initialData);
  const value = { state, dispatch };
  return( 
  <CardContext.Provider value={value}>
   {children}
   </CardContext.Provider>
   )
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("useCard deve ser usado dentro do Provider.");
  }
  return context;
};
