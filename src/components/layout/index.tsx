import * as React from "react";
import SideBar from "../sideBar";
import UserInfo from "../userInfo";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full">
      <aside className="md:w-[30%] lg:w-[35%] bg-gray-800 h-full">
        <SideBar />
      </aside>
      <div className="w-full text-center p-4">{children}</div>
      <aside className="hidden lg:block lg:w-[35%] bg-gray-800 h-auto text-white text-center">
        <UserInfo />
      </aside>
    </div>
  );
};

export default Layout;
