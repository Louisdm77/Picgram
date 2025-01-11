import * as React from "react";
import SideBar from "../sideBar";
import UserInfo from "../userInfo";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
  const { showSideBar, setShowSideBar } = useUserAuth();

  return (
    <div className="flex relative">
      <div className={`block md:hidden absolute p-2 z-50 `}>
        <button
          className={`text-2xl ${showSideBar ? "hidden" : "block"}`}
          onClick={() => {
            setShowSideBar(true);
            console.log(showSideBar);
          }}
        >
          <GiHamburgerMenu />
        </button>

        <button
          className={`text-2xl text-white ${showSideBar ? "block" : "hidden"}`}
          onClick={() => {
            setShowSideBar(false);
            console.log(showSideBar);
          }}
        >
          <FaTimes />
        </button>
      </div>

      <aside
        className={`md:block fixed md:static top-0 left-0 w-[60%] md:w-[35%] h-full bg-gray-800 z-40 ${
          !showSideBar ? "hidden" : ""
        }`}
      >
        <SideBar />
      </aside>
      <div className="w-full h-full text-center">{children}</div>
      <aside className="hidden lg:block lg:w-[30%] bg-gray-800 h-auto text-white text-center">
        <UserInfo />
      </aside>
    </div>
  );
};

export default Layout;
