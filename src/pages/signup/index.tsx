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
import { UserSignIn } from "../../types";
import { useUserAuth } from "@/assets/context/userAuthContext";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/images/img.png";

interface ISignupProps {}

const Signup: React.FunctionComponent<ISignupProps> = () => {
  const { googleSignIn, signUp } = useUserAuth();
  const navigate = useNavigate();
  const initialValue: UserSignIn = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userInfo, setUserInfo] = React.useState<UserSignIn>(initialValue);

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("the user info is", userInfo);

      if (userInfo.password === userInfo.confirmPassword) {
        signUp(userInfo.email, userInfo.password);

        navigate("/");
      } else {
        navigate("/error");
      }
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
    <div className="md:flex justify-around items-center bg-blue-300 w-full p-4 h-[100vh] fixed">
      <div className="hidden md:block md:hidden">
        <img src={image} alt="connect" />
      </div>
      <Card className="lg:w-[25%] md:w-[50%]  p-4 bg-blue-100 animate__animated animate__fadeInUp animate__animated animate__fadeInUp">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center font-bold text-3xl">
            <span className="text-red-400">Pic</span>
            <span>Gram</span>
          </h2>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
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
                  Or
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={userInfo.email}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, email: e.target.value });
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={userInfo.password}
                placeholder="Password"
                onChange={(e) => {
                  setUserInfo({ ...userInfo, password: e.target.value });
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="confirmpassword"
                type="password"
                value={userInfo.confirmPassword}
                placeholder="Confirm password"
                onChange={(e) => {
                  setUserInfo({ ...userInfo, confirmPassword: e.target.value });
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Create account</Button>
          </CardFooter>
          <p className="text-center mb-3">
            Already have an account ? <Link to="/login"> login here</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
