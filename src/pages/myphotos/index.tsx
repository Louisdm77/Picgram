import * as React from "react";
import Layout from "../../components/layout";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { DocumentResponse, Post } from "../../types";
import { getPostById } from "../../repository/post.service";
// import { FaEllipsis } from "react-icons/fa6";
// import { FaTimes } from "react-icons/fa";
// import { CiHeart } from "react-icons/ci";
interface IMyphotosProps {}

const Myphotos: React.FunctionComponent<IMyphotosProps> = () => {
  const { user } = useUserAuth();
  // const [clicked, setClicked] = React.useState<boolean>(false);
  const [data, setData] = React.useState<DocumentResponse[]>([]);

  const getAllPost = async (id: string) => {
    try {
      const querySnapShot = await getPostById(id);
      const tempArr: DocumentResponse[] = [];
      console.log("Query Snapshot:", querySnapShot);
      console.log("tempArr: ", tempArr);
      if (querySnapShot.size > 0) {
        querySnapShot.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          console.log("the response object is:", responseObj);
          tempArr.push(responseObj);
          console.log("tempArr: ", tempArr);
        });
        setData(tempArr);
      } else {
        console.log("nothing of such");
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPost(user.uid);
      console.log(user.uid);
    }
  }, []);
  return (
    <div>
      <Layout>
        <div className="p-1 lg:mt-0 mt-8 md:mt-0 w-full">
          <h3 className="text-center bg-gray-900 text-white p-3 mt-6">
            My Photos
          </h3>
          <div>
            {data ? (
              <div className="">
                {data.map((datum) => (
                  <div className="md:grid md:grid-cols-3 gap-10 p-4">
                    {datum.photos.map((pic) => (
                      <div className=" w-[80%] h-[64] md:w-40 md:h-40 mt-4 m-auto ">
                        <img
                          src={`${pic.cdnUrl}` || undefined}
                          alt=""
                          className="w-full h-full m-auto  rounded-lg cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Myphotos;
{
  /* <div className="">
          <h2 className="text-center font-extrabold text-2xl text-red-500 hidden m:block">
            LouiGram's Post
          </h2>
          <div className="md:px-20">
            {data.length > 0 ? (
              <div>
                {data.map((datt) => (
                  <div className="shadow-md border border-2 border-gray-300 md:p-4 mt-6 rounded-xl p-2  bg-white">
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-10 h-10"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyzK2fuK3gDNJMRMKGHwHXfyqd6X1pL4lAxg&s"
                          alt=""
                        />
                        <div className="">
                          <h2 className="text-blue-500 font-bold">
                            {" "}
                            {`user ${datt.userId.slice(0, 5)}`}
                          </h2>
                          <div>
                            <p className="text-start text-xs">{}</p>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="">
                        <button className="border border-2 border-gray-300 rounded-3xl p-2 hover:bg-gray-700 hover:text-white">
                          <FaEllipsis />
                        </button>
                      </div>
                    </div>

                    <h1 className="text-start mb-4 mt-4">{datt.caption}</h1>
                    <div className="w-full">
                      <div className="w-full">
                        {datt.photos.length > 1 ? (
                          <div>
                            <div className="grid grid-cols-3 gap-1">
                              {datt.photos.slice(0, 3).map((pic) => (
                                <div key={pic.url} className="w-40 h-40">
                                  <img
                                    src={pic.url || undefined}
                                    alt=""
                                    className="h-full w-full"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : datt.photos.length === 1 ? (
                          <div
                            key={datt.photos[0].cdnUrl}
                            className="w-full h-full"
                          >
                            <img
                              src={datt.photos[0].cdnUrl || undefined}
                              alt=""
                              className="h-full w-full"
                            />
                          </div>
                        ) : (
                          <div>No photos available</div> // Handle the case for no photos
                        )}
                      </div>
                    </div>
                    <div className="border-t-2 border-b-2 border-gray-300 p-2 mt-4 w-full flex justify-between px-6 bg-gray-200">
                      <button
                        className="rounded p-2 bg-white rounded border-2 border-gray-300 "
                        onClick={() => {
                          setClicked(!clicked);
                          if (clicked) {
                            datt.likes += 1;
                          } else {
                            datt.likes -= 1;
                          }
                        }}
                      >
                        Likes {`${datt.likes}`}
                      </button>
                      <button className="rounded p-2 bg-white rounded border-2 border-gray-300 ">
                        Add to favorites
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>Absolutely nothing</div>
            )}
          </div>
        </div> */
}
