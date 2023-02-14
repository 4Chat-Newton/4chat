import React, { createContext, useState, useContext, Dispatch, SetStateAction } from "react";

export interface GlobalStateInterface {
  activeRoom: string;
}

const GlobalStateContext = createContext({
  userContext: {} as Partial<GlobalStateInterface>,
  setUserContext: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
});

const GlobalStateProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: string;
}) => {

  const [userContext, setUserContext] = useState(value);

  
  return (
    <GlobalStateContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };