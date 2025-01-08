import * as React from "react";
import Layout from "../../components/layout";

interface IMyphotosProps {}

const Myphotos: React.FunctionComponent<IMyphotosProps> = (props) => {
  return (
    <div>
      <Layout>
        <div>MyPhotos</div>
      </Layout>
    </div>
  );
};

export default Myphotos;
