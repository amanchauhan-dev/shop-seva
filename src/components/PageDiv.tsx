import { HTMLAttributes } from "react";

export const PageDivClassName = "px-2 sm:px-10 lg:px-16 ";

const PageDiv: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={`${PageDivClassName}  ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default PageDiv;
