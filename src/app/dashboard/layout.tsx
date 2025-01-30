
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="flex">
    //   <div className="w-[250px]">
    //     <SideBar/>
    //   </div>
      <div className="flex-auto">{children}</div>
    // {/* </div> */}
  );
};

export default Layout;
