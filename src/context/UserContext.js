"use client";
import { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const user = {
    name: "Ayjan Muradova",
    email: "ayjan.muradova@code2career.eu"
  };

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);