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

interface IPostCardProps {}

const PostCard: React.FunctionComponent<IPostCardProps> = () => {
  const { user } = useUserAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<DocumentResponse[]>([]);
  const getAllPost = async () => {
    setLoading(true);
    try {
      const querySnapShot = await getAllPosts();
      const postArray = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        caption: doc.data().caption,
        photos: doc.data().photos,
        likes: doc.data().likes,
        userLikes: doc.data().userLikes,
        userId: doc.data().userId,
        date: doc.data().date,
      }));
      setData(postArray);
      console.log(data);
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (user != null) {
      getAllPost();
    }
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
                <div className="ml-4">
                  <CardTitle className="text-start">Guest_user</CardTitle>
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
            <CardFooter>
              <div>
                <p className="font-bold">{dat.caption}</p>
                <div className="flex mt-4">
                  <CiHeart className="text-2xl" />
                  <p>{dat.likes} likes</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <h2 className="mt-[20%] font-bold">No posts</h2>
      )}
    </div>
  );
};

export default PostCard;
