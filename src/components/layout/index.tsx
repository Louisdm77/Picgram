import * as React from "react";
import SideBar from "../sideBar";
import UserInfo from "../userInfo";
import { useSideBarContext } from "../../assets/context/sideBarContext";
import { SidebarContextProvider } from "../../assets/context/sideBarContext";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
  const { showSideBar } = useSideBarContext();

  return (
    <SidebarContextProvider>
      <div className="flex w-full">
        <aside
          className={`md:w-[35%] md:relative md:block  bg-gray-800 h-full absolute z-40 ${
            showSideBar ? "block" : "hidden"
          }`}
        >
          <SideBar />
        </aside>
        <div className="w-full text-center p-4">{children}</div>
        <aside className="hidden lg:block lg:w-[35%] bg-gray-800 h-auto text-white text-center">
          <UserInfo />
        </aside>
      </div>
    </SidebarContextProvider>
  );
};

export default Layout;
