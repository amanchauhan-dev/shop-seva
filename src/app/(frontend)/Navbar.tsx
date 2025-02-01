"use client";
import {
  BadgeHelp,
  ChevronDown,
  Cuboid,
  Heart,
  HelpingHand,
  Laptop,
  Locate,
  LogIn,
  LogOut,
  LogOutIcon,
  Menu,
  Moon,
  Settings,
  ShoppingBasket,
  Sun,
  User2,
  X,
} from "lucide-react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import { ProgressBarLink } from "@/context/ProgressBar";
import { HTMLAttributes, useContext, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import AuthForms from "./AuthForm";
import { ThemeContext } from "@/context/ThemeProvider";

const Navbar: React.FC = () => {
  const {setTheme}=useContext(ThemeContext)
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openAuthDialog, setOpenAuthDialog] = useState<boolean>(false);

  const handleThemeLight = () => {
    setTheme('light')
  };
  const handleThemeDark = () => {
    setTheme('dark')
  };
  const handleThemeSystem = () => {
    setTheme('system')
  };

  return (
    <section>
      <Menubar className="flex h-[54px] py-0 px-2 sm:px-10 lg:px-16 justify-between">
        {/* Logo */}
        <MenubarGroup className="">
          <ProgressBarLink href={"/"} className="">
            Logo
          </ProgressBarLink>
        </MenubarGroup>
        {/* Navigation */}
        <MenubarGroup className="flex items-center gap-3 max-sm:hidden">
          {/* Cart */}
          <MenubarMenu>
            <ProgressBarLink href={"cart"}>
              <Button variant={"outline"} size={"icon"}>
                <ShoppingBasket size={24} />
              </Button>
            </ProgressBarLink>
          </MenubarMenu>
          {/* wish list */}
          <MenubarMenu>
            <ProgressBarLink href={"wish-list"}>
              <Button variant={"outline"} size={"icon"}>
                <Heart size={24} />
              </Button>
            </ProgressBarLink>
          </MenubarMenu>
          {/* Profile */}
          {/* <MenubarMenu>
            <ProgressBarLink href={"wish-list"}>
              <Button
                variant={"outline"}
                className="rounded-full"
                size={"icon"}
              >
                <User size={24} />
              </Button>
            </ProgressBarLink>
          </MenubarMenu> */}
          {/* Login */}
          <MenubarMenu>
            <Button
              variant={"outline"}
              onClick={() => {
                setOpenAuthDialog(true);
              }}
              size={"icon"}
              className="w-fit px-2"
            >
              <LogIn size={24} /> Sign In
            </Button>
          </MenubarMenu>
          {/* More */}
          <MenubarMenu>
            <MenubarTrigger className=" h-9">
              More <ChevronDown className="text-muted-foreground size-4 " />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem>Profile</MenubarCheckboxItem>
              <MenubarItem inset>Addresses</MenubarItem>
              <MenubarCheckboxItem>Cart</MenubarCheckboxItem>
              <MenubarCheckboxItem>Wish List</MenubarCheckboxItem>
              <MenubarCheckboxItem>Orders</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem>Issues</MenubarItem>
              <MenubarItem inset>Settings</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Help ?</MenubarItem>
              <MenubarItem inset>Terms & Privacy</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>
                Logout <LogOut size={13} className="ml-2" />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          {/* theme */}
          <MenubarMenu>
            <MenubarTrigger>
              {false ? <Moon size={17} /> : <Sun size={17} />}
            </MenubarTrigger>
            <MenubarContent className="px-0">
              <MenubarRadioGroup value="systemTheme">
                <MenubarRadioItem
                  value="light"
                  className="px-3 cursor-pointer"
                  onClick={handleThemeLight}
                >
                  <Sun size={18} className="mr-2" /> Light
                </MenubarRadioItem>
                <MenubarRadioItem
                  value="dark"
                  className="px-3 cursor-pointer"
                  onClick={handleThemeDark}
                >
                  <Moon size={18} className="mr-2" /> Dark
                </MenubarRadioItem>
                <MenubarRadioItem
                  value="system"
                  className="px-3 cursor-pointer"
                  onClick={handleThemeSystem}
                >
                  <Laptop size={18} className="mr-2" /> System
                </MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
        </MenubarGroup>
        {/* Menu bar */}
        <MenubarGroup className="sm:hidden">
          <MenubarMenu>
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => setOpenMenu((e) => !e)}
            >
              <Menu size={24} className="!size-6" />
            </Button>
            <MenubarContent>hello</MenubarContent>
          </MenubarMenu>
        </MenubarGroup>
      </Menubar>
      {/* Mobile Menu bar Content */}
      <>
        <div
          className={`sm:hidden absolute transition-all w-[100vw] h-[100vh] left-0 top-0 !bg-zinc-200/55 dark:!bg-zinc-500/55 !z-[990] ${
            !openMenu && "hidden"
          }`}
        ></div>
        <div
          className={`absolute flex sm:hidden top-0 overflow-hidden transition-all right-0 ${
            openMenu ? "w-[100vw]" : "w-[0]"
          } `}
        >
          <div
            className="h-[100vh] flex-auto !z-[999]"
            onClick={() => setOpenMenu(false)}
          ></div>
          <div className="h-[100vh] w-[250px] max-[251]:w-[100vw] bg-background !z-[999] flex flex-col justify-between border">
            <div className="">
              <div className="flex justify-end pr-2 p-2">
                <X onClick={() => setOpenMenu(false)} />
              </div>
            </div>
            <ScrollArea className="h-full w-full">
              <div className="p-2 pl-0">
                {/* SideBar List */}
                <SideBarItem
                  setOpenMenu={setOpenMenu}
                  startProp={<User2 />}
                  className="bg-secondary"
                >
                  <Profile />
                </SideBarItem>
                <SideBarItem setOpenMenu={setOpenMenu} startProp={<Locate />}>
                  Address
                </SideBarItem>
                <SideBarItem
                  setOpenMenu={setOpenMenu}
                  startProp={<ShoppingBasket />}
                >
                  Cart
                </SideBarItem>
                <SideBarItem setOpenMenu={setOpenMenu} startProp={<Heart />}>
                  Wish List
                </SideBarItem>
                <SideBarItem setOpenMenu={setOpenMenu} startProp={<Cuboid />}>
                  Orders
                </SideBarItem>
                <SideBarItem
                  setOpenMenu={setOpenMenu}
                  startProp={<HelpingHand />}
                >
                  Issue
                </SideBarItem>
                <SideBarItem setOpenMenu={setOpenMenu} startProp={<Settings />}>
                  Settings
                </SideBarItem>
                <SideBarItem
                  setOpenMenu={setOpenMenu}
                  startProp={<BadgeHelp />}
                >
                  Help ?
                </SideBarItem>
                <SideBarItem
                  setOpenMenu={setOpenMenu}
                  startProp={<LogOutIcon />}
                >
                  Logout
                </SideBarItem>
              </div>
            </ScrollArea>
          </div>
        </div>
      </>
      <AuthForms open={openAuthDialog} setOpen={setOpenAuthDialog} />
    </section>
  );
};

export default Navbar;

interface SideBarItemProps extends HTMLAttributes<HTMLDivElement> {
  href?: string;
  startProp?: React.ReactNode | null;
  setOpenMenu: (x: boolean) => void;
}

// Mobile Sidebar Item

const SideBarItem: React.FC<SideBarItemProps> = ({
  children,
  className,
  startProp = null,
  href = "#",
  setOpenMenu,
  ...rest
}) => {
  return (
    <div
      className={"border-b  w-full mb-0.5 " + className}
      onClick={() => setOpenMenu(false)}
      {...rest}
    >
      <ProgressBarLink href={href} className="p-3 py-1 flex items-center gap-1">
        <Button
          size={"icon"}
          className="m-0"
          variant={startProp !== null ? "outline" : "ghost"}
        >
          {startProp !== null ? startProp : ""}
        </Button>
        {children}
      </ProgressBarLink>
    </div>
  );
};

// Profile Component

export const Profile: React.FC = () => {
  return <div>Profile</div>;
};
