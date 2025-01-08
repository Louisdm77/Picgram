import * as React from "react";
import Layout from "../../components/layout";
interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  return (
    <div>
      <Layout>
        <div>Profile</div>
      </Layout>
    </div>
  );
};

export default Profile;
