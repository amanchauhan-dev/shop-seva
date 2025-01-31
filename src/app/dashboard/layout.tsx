'use client'
import { AppSidebar } from "./sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Header from "./Header";
const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header/>
          <div className="flex-auto py-2 px-2 sm:px-4 lg:px-6 xl:px-8 ">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
  );
};

export default Layout;
