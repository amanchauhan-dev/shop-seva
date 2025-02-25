"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ProgressBarLink } from "@/context/ProgressBar";
import { Skeleton } from "@/components/ui/skeleton";
const Header: React.FC = () => {
  const path = usePathname();
  const { isMobile } = useSidebar();
  const [hydrate, setHydrate] = useState<boolean>(true);
  useEffect(() => {
    setHydrate(false);
  }, []);

  return (
    <header className="flex bg-card shadow-md dark:shadow-sm justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {hydrate && !isMobile ? (
          <Skeleton />
        ) : (
          <Breadcrumb>
            <BreadcrumbList>
              {path
                .split("/")
                .slice(1, path.split("/").length)
                .map((e, i, arr) => {
                  if (i == arr.length - 1) {
                    return (
                      <BreadcrumbItem key={i} className="hidden md:block">
                        <BreadcrumbPage>
                          <ProgressBarLink href={path}>
                            {e[0].toLocaleUpperCase() +
                              e.substring(1, e.length)}
                          </ProgressBarLink>
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    );
                  } else {
                    return (
                      <span key={i} className="flex gap-2 items-center">
                        <BreadcrumbItem key={i} className="hidden md:block">
                          <ProgressBarLink
                            href={"/" + arr.slice(0, i + 1).join("/")}
                          >
                            {e[0].toLocaleUpperCase() +
                              e.substring(1, e.length)}
                          </ProgressBarLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block mt-0.5" />
                      </span>
                    );
                  }
                })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
      <div className="mr-4 flex gap-3 items-center">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
