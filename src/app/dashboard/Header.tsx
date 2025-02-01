"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ChangeTheme from "./changeTheme";
import { useEffect, useState } from "react";
const Header: React.FC = () => {
  const [locationArr, setLocationArr] = useState<
    {
      title: string;
      url: string;
    }[]
  >([]);
  useEffect(() => {
    setLocationArr([{ title: "Dashboard", url: "/dashboard" }]);
    console.log(locationArr);

    console.log(window.location.pathname);
  }, [window.location]);

  return (
    <header className="flex bg-secondary justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">People</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbPage>
                <BreadcrumbLink href="#">Employee</BreadcrumbLink>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mr-4">
        <ChangeTheme />
      </div>
    </header>
  );
};

export default Header;
