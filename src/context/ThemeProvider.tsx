"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-store";
import { setTheme } from "@/store/slices/themeSlice";
import { useEffect } from "react";
import { usePrefersTheme } from "react-haiku";

const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  let currentTheme = useAppSelector((s) => s.theme.theme);
  const theme = usePrefersTheme("light");
  const dispatch = useAppDispatch();

  return (
    <body className={`${currentTheme == "system" ? theme : currentTheme}`}>
      {children}
    </body>
  );
};

export default ThemeProvider;
