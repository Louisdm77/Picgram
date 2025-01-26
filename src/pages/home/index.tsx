import * as React from "react";
import Layout from "../../components/layout";
import Stories from "../../components/stories";
import PostCard from "../../components/postCard";
interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = () => {
  return (
    <div>
      <Layout>
        <div className="md:mt-0 mt-10">
          <Stories />
          <PostCard/>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
