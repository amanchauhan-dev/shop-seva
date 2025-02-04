"use client";

import { Users } from "@/validations/userModel";
import { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";

interface AuthContextState {
  isLoggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  user: Users | null;
  setUser: Dispatch<SetStateAction<Users | null>>;
}

export const AuthContext = createContext<AuthContextState>({
  isLoggedIn: false,
  setLoggedIn: () => {},
  user: null,
  setUser: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Users | null>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <AuthContext value={{ isLoggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;
