"use client";

import {  useAppSelector } from "@/hooks/redux-store";
import { usePrefersTheme } from "react-haiku";

const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  const currentTheme = useAppSelector((s) => s.theme.theme);
  const theme = usePrefersTheme("light");

  return (
    <body className={`${currentTheme == "system" ? theme : currentTheme}`}>
      {children}
    </body>
  );
};

export default ThemeProvider;
