"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
  Users2,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
export const NavigationData = {
  user: {
    name: "aman0435",
    email: "chauhan.aman@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Summary",
          url: "/dashboard",
        },
        {
          title: "Analytics  and Statistics",
          url: "/dashboard/analytics",
        },
        {
          title: "Accounts",
          url: "/dashboard/accounts",
        },
      ],
    },
    {
      title: "Inventory",
      url: "/dashboard/inventory",
      icon: Bot,
      items: [
        {
          title: "Summary",
          url: "/dashboard/inventory",
        },
        {
          title: "Products",
          url: "/dashboard/inventory/products",
        },
        {
          title: "Out Of Stock",
          url: "/dashboard/inventory/out-of-stock",
        },
        {
          title: "Drafts or Inactive",
          url: "/dashboard/inventory/draft-inactive",
        },
        {
          title: "Add Product",
          url: "/dashboard/inventory/add-product",
        },
      ],
    },
    {
      title: "People",
      url: "/dashboard/people",
      icon: Users2,
      items: [
        {
          title: "Summary",
          url: "/dashboard/people",
        },
        {
          title: "Users",
          url: "/dashboard/people/users",
        },
        {
          title: "Customers",
          url: "/dashboard/people/customers",
        },
        {
          title: "Employees",
          url: "/dashboard/people/employees",
        },
        {
          title: "Blocks or Inactive",
          url: "/dashboard/people/block-inactive",
        },
        {
          title: "Add User",
          url: "/dashboard/people/add-user",
        },
      ],
    },
    {
      title: "Brands and Categories",
      url: "/dashboard/brands-categories",
      icon: BookOpen,
      items: [
        {
          title: "Summary",
          url: "/dashboard/brands-categories",
        },
        {
          title: "Categories",
          url: "/dashboard/brands-categories/categories",
        },
        {
          title: "Brands",
          url: "/dashboard/brands-categories/brands",
        },
        {
          title: "Drafts or Inactive",
          url: "/dashboard/brands-categories/inactive-draft",
        },
        {
          title: "Add Brand",
          url: "/dashboard/brands-categories/add-brand",
        },
        {
          title: "Add Category",
          url: "/dashboard/brands-categories/add-category",
        },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Client",
          url: "#",
        },
        {
          title: "Dashboard",
          url: "#",
        },
        {
          title: "Advance",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="shadow-lg" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={NavigationData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NavigationData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={NavigationData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
