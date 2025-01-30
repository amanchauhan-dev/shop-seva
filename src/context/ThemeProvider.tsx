"use client";

import { useEffect } from "react";

const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  useEffect(() => {
    console.log("Theme Provider");
    const body = document.getElementsByTagName("body")[0];
    console.log(body);
  }, []);
  return <>{children}</>;
};

export default ThemeProvider;
