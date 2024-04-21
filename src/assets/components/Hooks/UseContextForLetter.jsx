import { createContext, useState } from "react";

export const Context = createContext(undefined);
export const UseContextForLetter = ({ children }) => {
  const [classLetter, setClassLetter] = useState({});

  return (
    <Context.Provider value={{ classLetter, setClassLetter }}>
      {children}
    </Context.Provider>
  );
};
