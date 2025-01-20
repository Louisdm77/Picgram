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
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";

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
  return (
    <div className={`px-4`}>
      <h2 className="text-red-400 text-2xl font-bold mt-12 text-center">
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
  );
};

export default SideBar;
