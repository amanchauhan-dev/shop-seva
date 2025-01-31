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
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overall",
          url: "/dashboard",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
        {
          title: "Accounts",
          url: "/dashboard/accounts",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Inventory",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Out Of Stock",
          url: "#",
        },
        {
          title: "Drafts or Inactive",
          url: "#",
        },
        {
          title: "Add Product",
          url: "#",
        },
      ],
    },
    {
      title: "People",
      url: "/dashboard/people",
      icon: Users2,
      items: [
        {
          title: "Users",
          url: "/dashboard/people",
        },
        {
          title: "Customers",
          url: "#",
        },
        {
          title: "Employees",
          url: "#",
        },
        {
          title: "Blocks or Inactive",
          url: "#",
        },
        {
          title: "Add",
          url: "#",
        },
      ],
    },
    {
      title: "Types and Categories",
      url: "/dashboard/categories",
      icon: BookOpen,
      items: [
        {
          title: "Categories",
          url: "#",
        },
        {
          title: "Drafts or Inactive",
          url: "#",
        },
        {
          title: "Add Category",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
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
    <Sidebar collapsible="icon" {...props}>
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
