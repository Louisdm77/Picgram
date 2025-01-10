import * as React from "react";
// import { IoIosAddCircle } from "react-icons/io"; <IoIosAddCircle />
// import { FaHeart } from "react-icons/fa"; <FaHeart />
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import { MdAddAPhoto } from "react-icons/md";
import { MdInsertPhoto } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { useSideBarContext } from "../../assets/context/sideBarContext";

interface ISideBarProps {}

const SideBar: React.FunctionComponent<ISideBarProps> = () => {
  const [clicked, setClicked] = useState<string>("");
  const { logOut } = useUserAuth();
  const navList = [
    {
      name: "Home",
      link: "/",
      icon: <IoMdHome />,
    },
    {
      name: "Add photos",
      link: "/post",
      icon: <MdAddAPhoto />,
    },
    {
      name: "My photos",
      link: "/myphotos",
      icon: <MdInsertPhoto />,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <CgProfile />,
    },
    {
      name: "Notifications",
      link: "/",
      icon: <IoIosNotifications />,
    },
    {
      name: "Direct",
      link: "/",
      icon: <IoSettings />,
    },
    {
      name: "Settings",
      link: "/login",
      icon: <IoSettings />,
    },
  ];

  const { showSideBar, setShowSideBar } = useSideBarContext();

  return (
    <div className="git">
      <div className={`md:hidden absolute p-4`}>
        <button
          className={`text-2xl ${!showSideBar ? "block" : "hidden"}`}
          onClick={() => {
            setShowSideBar(true);
            console.log(showSideBar);
          }}
        >
          <GiHamburgerMenu />
        </button>
        <button
          className={`text-2xl ${showSideBar ? "block" : "hidden"} `}
          onClick={() => {
            setShowSideBar(false);
            console.log(showSideBar);
          }}
        >
          <FaTimes />
        </button>
      </div>

      <div className={``}>
        <h2 className="text-red-400 text-2xl font-bold mt-8 text-center">
          <span className="text-red-400">Loui</span>
          <span>Gram</span>
        </h2>

        <nav className="mt-8 ">
          <div>
            {navList.map((nav, index) => {
              return (
                <Link to={nav.link}>
                  <div
                    className="flex-col mb-2 font-bold text-center p-4 hover:bg-gray-700 hover:text-black text-white"
                    key={index}
                    onClick={() => setClicked(nav.name)}
                    style={{
                      backgroundColor: clicked === nav.name ? "black" : "",
                      color: clicked === nav.name ? "white" : "white",
                    }}
                  >
                    {" "}
                    <div className="flex items-center ">
                      <span className="mr-4 text-2xl">{nav.icon}</span>
                      <span>{nav.name}</span>
                    </div>
                  </div>
                </Link>
              );
            })}{" "}
          </div>
          <div
            className="flex-col mb-2 font-bold text-center p-4 hover:bg-gray-100 hover:text-black text-white"
            onClick={() => {
              logOut(), setClicked("logOut");
            }}
            style={{
              backgroundColor: clicked === "logOut" ? "black" : "",
              color: clicked === "logOut" ? "white" : "",
            }}
          >
            {" "}
            <Link to="/login" className="flex items-center ">
              <span className="mr-4 text-2xl">
                <IoIosLogOut />
              </span>
              <span>Log Out</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
