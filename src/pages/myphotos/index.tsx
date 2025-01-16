import * as React from "react";
import Layout from "../../components/layout";
import { useUserAuth } from "../../assets/context/userAuthContext";
import { DocumentResponse, Post } from "../../types";
import { getPostById } from "@/repository/post.service";
interface IMyphotosProps {}

const Myphotos: React.FunctionComponent<IMyphotosProps> = (props) => {
  const { user } = useUserAuth();
  const [data, setData] = React.useState<DocumentResponse[]>([]);

  const getAllPost = async (id: string) => {
    try {
      const querySnapShot = await getPostById(id);
      const tempArr: DocumentResponse[] = [];
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
    }
  }, []);
  return (
    <div>
      <Layout>
        <div>MyPhotos</div>
      </Layout>
    </div>
  );
};

export default Myphotos;

// import * as React from "react";
// import Layout from "../../components/layout";

// interface IMyphotosProps {}

// interface Photo {
//   url: string;
//   cdnUrl: string;
//   uuid: string;
// }

// interface Post {
//   caption: string;
//   photos: Photo[];
//   likes: number;
//   userLikes: string[];
//   userId: string;
//   date: string;
// }

// const Myphotos: React.FunctionComponent<IMyphotosProps> = () => {
//   // Assuming you fetched the data or passed it as props.
//   const [posts, setPosts] = React.useState<Post[]>([]);

//   React.useEffect(() => {
//     // Fetch your posts from the backend.
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("/api/posts"); // Replace with your actual API endpoint
//         if (!response.ok) {
//           throw new Error("Failed to fetch posts");
//         }
//         const data: Post[] = await response.json();
//         setPosts(data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <Layout>
//         <div className="p-8 border border-2 rounded-2xl">
//           <h3 className="text-center bg-gray-900 text-white font-bold p-3">
//             My Photos
//           </h3>
//           {posts.length > 0 ? (
//             <div className="mt-4">
//               {posts.map((post, index) => (
//                 <div key={index} className="mb-8">
//                   <h4 className="font-bold text-gray-800">{post.caption}</h4>
//                   <div className="grid grid-cols-3 gap-4 mt-2">
//                     {post.photos.map((photo, idx) => (
//                       <img
//                         key={idx}
//                         src={photo.url}
//                         alt={`Photo ${idx + 1}`}
//                         className="w-32 h-32 object-cover rounded"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center mt-4">No photos uploaded yet.</p>
//           )}
//         </div>
//       </Layout>
//     </div>
//   );
// };

// export default Myphotos;
