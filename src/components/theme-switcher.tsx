"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeContext } from "@/context/ThemeProvider";
import { Laptop, Moon, Sun } from "lucide-react";
import { useContext } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useContext(ThemeContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          {theme == "system" && systemTheme == "dark" ? (
            <Moon />
          ) : theme == "light" ? (
            <Sun />
          ) : (
            <Moon />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Change Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={theme == "light" ? true : false}
            onClick={() => setTheme("light")}
          >
            <Sun /> Light
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={theme == "dark" ? true : false}
            onClick={() => setTheme("dark")}
          >
            <Moon /> Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={theme == "system" ? true : false}
            onClick={() => setTheme("system")}
          >
            <Laptop /> System
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
