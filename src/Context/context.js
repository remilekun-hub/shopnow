import { createContext, useContext, useReducer } from "react";
import cartReducer from "./Reducers/cartreducer";
import totalreducer from "./Reducers/totalreducer";

const context = createContext();

export const Provider = ({ children }) => {
  const [Cart, dispatchCart] = useReducer(cartReducer, []);
  const [Total, dispatchTotal] = useReducer(totalreducer, 0);

  return (
    <context.Provider value={{ Cart, dispatchCart, Total, dispatchTotal }}>
      {children}
    </context.Provider>
  );
};

export const useMycontext = () => {
  return useContext(context);
};
