import React from "react";
import { useState, useContext, createContext } from "react";

type sideBarType = {
  showSideBar: boolean;
  setShowSideBar: (show: boolean) => void;
};

const SideBarContext = createContext<sideBarType>({} as sideBarType);

export const SidebarContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const value: sideBarType = {
    showSideBar,
    setShowSideBar,
  };
  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
};

export const useSideBarContext = () => {
  return useContext(SideBarContext);
};
