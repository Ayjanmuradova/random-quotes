"use client";
import { createContext, useContext, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

const UserContext = createContext<User | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
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