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

  React.useEffect(() => {
    console.log(showSideBar);
  }, [showSideBar]);
  return (
    <div className="grid lg:grid-cols-[20%_60%_20%] md:grid-cols-[20%_80%] relative  ">
      <div
        className={`block md:hidden fixed top-0 left-0 p-2 z-50 w-full shadow-xl bg-white`}
      >
        <button
          className={`text-2xl ${showSideBar ? "hidden" : "block"}`}
          onClick={() => {
            setShowSideBar(true);
            document.body.style.overflow =  "hidden" 
          }}
        >
          <GiHamburgerMenu />
        </button>

        <button
          className={`text-2xl text-black ${showSideBar ? "block" : "hidden"}`}
          onClick={() => {
            setShowSideBar(false);
            document.body.style.overflow =  "auto" 
          }}
        >
          <FaTimes />
        </button>
      </div>

      <aside className={` md:block ${!showSideBar ? "hidden" : ""}`}>
        <SideBar />
      </aside>
      <div className=" h-full  text-center m-4 md:mt-0 md:p-6">{children}</div>
      <aside className="hidden lg:block lg:w-[38%] bg-gray-800 h-auto text-white text-center">
        <UserInfo />
      </aside>
    </div>
  );
};

export default Layout;
