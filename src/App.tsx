import * as React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { UserAuthProvider } from "./assets/context/userAuthContext";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <UserAuthProvider>
      <RouterProvider router={router} />;
    </UserAuthProvider>
  );
};

export default App;
