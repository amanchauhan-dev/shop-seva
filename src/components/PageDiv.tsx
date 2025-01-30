import { HTMLAttributes } from "react";


const PageDiv: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
  return <div className={`px-2 sm:px-10 lg:px-16  ${className}`} {...rest}>{children}</div>;
};

export default PageDiv;
