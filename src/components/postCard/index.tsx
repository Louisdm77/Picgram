import * as React from "react";
import { useUserAuth } from "../../assets/context/userAuthContext";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllPosts } from "@/repository/post.service";
import { DocumentResponse } from "../../types";
import img from "../../assets/images/dw4.jpg";
import { CiHeart } from "react-icons/ci";
// import { useAuthState } from "react-firebase-hooks/auth";
import { Spinner } from "../ui/spinner";
import { FiMessageCircle } from "react-icons/fi";

interface IPostCardProps {}

const PostCard: React.FunctionComponent<IPostCardProps> = () => {
  const { user, post } = useUserAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<DocumentResponse[]>([]);
  const getAllPost = async () => {
    setLoading(true);
    try {
      const querySnapShot = await getAllPosts();
      const postArray = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().user,
        displayName: doc.data().displayName,
        caption: doc.data().caption,
        photos: doc.data().photos,
        likes: doc.data().likes,
        userLikes: doc.data().userLikes,
        userId: doc.data().userId,
        date: doc.data().date,
      }));
      setData(postArray);
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPost();
      console.log(post.date);
    }
  }, []);

  React.useEffect(() => {
    console.log(data);
  }, []);
  return (
    <div className="mt-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="md" className="bg-black dark:bg-white" />
        </div>
      ) : data.length > 0 ? (
        data.map((dat) => (
          <Card key={dat.id} className="w-72 m-auto mb-4 mt-4">
            <CardHeader>
              <div className="flex items-center">
                <div>
                  <img
                    src={img}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="ml-2 text-sm">
                  <CardTitle className="text-start block">
                    {dat?.displayName !== null ? (
                      <span>{dat.displayName}</span>
                    ) : (
                      <span>{dat.email}</span>
                    )}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {dat.photos.length > 0 && (
                <img
                  src={dat.photos[0].cdnUrl || undefined}
                  alt="Post"
                  className="w-50 h-60 rounded-lg mx-auto"
                />
              )}
            </CardContent>
            {/* <CardFooter>
              <div className="flex justify-between item-center">
                <p className="font-bold">{dat.caption}</p>
                <div className="flex mt-4">
                  <CiHeart className="text-2xl" />
                  <p>{dat.likes} likes</p>
                </div>
                <div>
                  <FiMessageCircle />
                </div>
              </div>
            </CardFooter> */}
          </Card>
        ))
      ) : (
        <h2 className="mt-[20%] font-bold">No posts</h2>
      )}
    </div>
  );
};

export default PostCard;
