"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "./Header";
import { AppSidebar } from "./sidebar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex-auto py-2 px-2 ">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
