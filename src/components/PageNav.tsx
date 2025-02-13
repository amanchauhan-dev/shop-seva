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
    <div className="flex max-sm:justify-center flex-wrap gap-1 mb-4 overflow-auto">
      {data.length > 0 &&
        data.map((e, i) => {
          return (
            <ProgressBarLink
              key={i}
              className={`${
                path == e.url ? "bg-primary text-white" : "bg-sidebar hover:bg-transparent"
              }  transition-colors shadow-md rounded  p-0.5 sm:p-1.5 whitespace-nowrap  px-2 sm:px-3 border-2 border-sidebar `}
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
