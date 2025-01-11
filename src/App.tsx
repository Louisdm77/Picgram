import * as React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { UserAuthProvider } from "./assets/context/userAuthContext";
import { SidebarContextProvider } from "./assets/context/sideBarContext";
import Layout from "./components/layout";

interface IAppProps {}

const App = () => {
  return (
    <UserAuthProvider>
      <RouterProvider router={router} />
    </UserAuthProvider>
  );
};

export default App;
