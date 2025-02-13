"use client";

import { Toaster } from "react-hot-toast";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { usePrefersTheme } from "react-haiku";

interface ThemeContextState {
  theme: "light" | "dark" | "system";
  systemTheme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark" | "system">>;
}
export const ThemeContext = createContext<ThemeContextState>({
  theme: "dark",
  systemTheme: "dark",
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const systemTheme = usePrefersTheme("dark");

  return (
    <ThemeContext value={{ setTheme: setTheme, theme, systemTheme }}>
      <body className={`${theme == "system" ? systemTheme : theme}`}>
        {children}
        <Toaster />
      </body>
    </ThemeContext>
  );
};

export default ThemeProvider;
