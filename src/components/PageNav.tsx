"use client";
import { ProgressBarLink } from "@/context/ProgressBar";
import { usePathname } from "next/navigation";

interface links {
  title: string;
  url: string;
}

interface PageNavProps {
  data: links[];
}

const PageNav: React.FC<PageNavProps> = ({ data }) => {
  const path = usePathname();
  
  return (
    <div className="flex gap-3 flex-wrap max-sm:justify-center mb-4">
      {data.length > 0 &&
        data.map((e, i) => {
          return (
            <ProgressBarLink
              key={i}
              className={`${
                path == e.url ? "bg-transparent " : "bg-sidebar"
              } hover:bg-transparent transition-colors shadow-md  p-0.5 sm:p-1.5 rounded-md px-2 sm:px-3 border-2 border-sidebar `}
              href={e.url}
            >
              {e.title}
            </ProgressBarLink>
          );
        })}
    </div>
  );
};

export default PageNav;
