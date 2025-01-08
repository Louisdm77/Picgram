import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Error from "./pages/error";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Post from "./pages/post";
import Myphotos from "./pages/myphotos";
import Profile from "./pages/profile";
import ProtectedRoutes from "./components/protectedRoutes";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: "/post",
        element: <Post />,
        errorElement: <Error />,
      },
      {
        path: "/myphotos",
        element: <Myphotos />,
        errorElement: <Error />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <Error />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <Error />,
  },
]);

export default router;
