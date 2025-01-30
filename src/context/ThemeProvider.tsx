import { HTMLAttributes } from "react";

interface ThemeProviderProps extends HTMLAttributes<HTMLBodyElement> {};

const ThemeProvider: React.FC<ThemeProviderProps> = ({children,...rest}) => {

  return <div>ThemeProvider</div>;
};


export default ThemeProvider;