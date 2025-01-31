"use client";
import { ThemeContext } from "@/context/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";

const ChangeTheme: React.FC = () => {
  const { theme, setTheme, systemTheme } = useContext(ThemeContext);

  if (theme == "system") {
    if (systemTheme == "dark") {
      return (
        <Moon
          size={17}
          onClick={() => setTheme("light")}
          className="cursor-pointer"
        />
      );
    } else {
      return (
        <Sun
          size={17}
          onClick={() => setTheme("dark")}
          className="cursor-pointer"
        />
      );
    }
  } else if (theme == "dark") {
    return (
      <Moon
        size={17}
        onClick={() => setTheme("light")}
        className="cursor-pointer"
      />
    );
  } else {
    return (
      <Sun
        size={17}
        onClick={() => setTheme("dark")}
        className="cursor-pointer"
      />
    );
  }
};

export default ChangeTheme;
