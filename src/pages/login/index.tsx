import * as React from "react";
import { Icons } from "../../components/ui/icons";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { UserLogIn } from "../../types";
import { useUserAuth } from "@/assets/context/userAuthContext";
import { Link, useNavigate } from "react-router-dom";

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const { googleSignIn, logIn, setShowSideBar, user } = useUserAuth();
  const navigate = useNavigate();
  const initialValue: UserLogIn = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userLogInInfo, setUserLogInInfo] =
    React.useState<UserLogIn>(initialValue);

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("the user info is :", userLogInInfo);
      await logIn(userLogInInfo.email, userLogInInfo.password);
      setShowSideBar(false);
      console.log("user", user);
      navigate("/");
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="flex justify-around items-center p-4  w-full h-[100vh] bg-blue-400 fixed">
      <Card className="w-full md:w-[50%] lg:w-[25%] p-4  text-start bg-blue-100">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center font-bold text-3xl">
            <span className="text-red-400">Pic</span>
            <span>Gram</span>
          </h2>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login to your account</CardTitle>
            <CardDescription>Enter your credentials to login</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 gap-6">
              <Button variant="outline" onClick={handleGoogleSignIn}>
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={userLogInInfo.email}
                onChange={(e) => {
                  setUserLogInInfo({ ...userLogInInfo, email: e.target.value });
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={userLogInInfo.password}
                placeholder="Password"
                onChange={(e) => {
                  setUserLogInInfo({
                    ...userLogInInfo,
                    password: e.target.value,
                  });
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">login</Button>
          </CardFooter>

          <p className="text-center mb-3">
            Don't have an account ? <Link to="/signup"> Sign up</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Login;
