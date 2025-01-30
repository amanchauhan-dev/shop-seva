import { HTMLAttributes } from "react";

interface PageDivProps extends HTMLAttributes<HTMLDivElement> {}

const PageDiv: React.FC<PageDivProps> = ({ children, className, ...rest }) => {
  return <div className={`px-2 sm:px-10 lg:px-16  ${className}`}>PageDiv</div>;
};

export default PageDiv;
