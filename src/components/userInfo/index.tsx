import * as React from "react";

interface IUserInfoProps {}

const UserInfo: React.FunctionComponent<IUserInfoProps> = () => {
  return (
    <div
      className={`md:block h-screen fixed top-0 right-0 w-[60%] md:w-[21%] h-auto bg-gray-800 z-40`}
    >
      UserInfo
    </div>
  );
};
export default UserInfo;
