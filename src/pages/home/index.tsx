import * as React from "react";
import Layout from "../../components/layout";
import Stories from "../../components/stories";
interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = () => {
  return (
    <div>
      <Layout>
        <div className="md:mt-0 mt-10">
          <Stories />
        </div>
      </Layout>
    </div>
  );
};

export default Home;
