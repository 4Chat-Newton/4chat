import React, { createContext, useContext, useState } from "react";

interface JwtContextType {
  jwt: string | null;
  setJwt: (jwt: string | null) => void;
}

interface JwtProviderProps {
    children : React.ReactNode;
}

const JwtContext = createContext<JwtContextType>({
  jwt: "",
  setJwt: () => {},
});

const JwtProvider: React.FC<JwtProviderProps> = ({ children }) => {
  const [jwt, setJwt] = useState<string | null>(null);

  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      {children}
    </JwtContext.Provider>
  );
};

const useJwt = () => useContext(JwtContext);

export{ JwtProvider, useJwt }
