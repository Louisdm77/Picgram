import * as React from "react";
import Layout from "../../components/layout";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import {
  FileUploaderRegular,
  type UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useUserAuth } from "@/assets/context/userAuthContext";
import { FileEntry, Post } from "../../types";
import { OutputFileEntry } from "@uploadcare/file-uploader";

interface PhotoMeta {
  url: string | null;
  cdnUrl: string | null;
  uuid: string; 
}

const CreatePost: React.FunctionComponent = () => {
  const { user } = useUserAuth();
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({ files: [] });

  const handleChangeEvent = ({ allEntries }: { allEntries: OutputFileEntry[] }) => {
    setFileEntry({
      files: allEntries.filter((f) => f.status === "success"),
    });
  };

  const [post, setPost] = React.useState<Post>({
    caption: "",
    photos: [],
    likes: 0,
    userLikes: [],
    userId: user?.uid || "",
    date: new Date(),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Map uploaded files to the PhotoMeta type
    const uploadedPhotoUrls: PhotoMeta[] = fileEntry.files.map((file) => ({
      url: file.cdnUrl,
      cdnUrl: file.cdnUrl,
      uuid: file.uuid || "", 
    }));

    setPost((prevPost) => ({
      ...prevPost,
      photos: uploadedPhotoUrls, 
    }));

    console.log("The file entry is:", fileEntry);
    console.log("The post data is:", {
      ...post,
      photos: uploadedPhotoUrls,
    });

    // Reset the form after submission
    setPost({
      caption: "",
      photos: [],
      likes: 0,
      userLikes: [],
      userId: user?.uid || "",
      date: new Date(),
    });
    setFileEntry({ files: [] });
  };

  return (
    <div>
      <Layout>
        <div className="p-8 border border-2 rounded-2xl">
          <h3 className="text-center bg-gray-900 text-white font-bold p-3">
            CREATE POST
          </h3>
          <form className="p-4" onSubmit={handleSubmit}>
            <label htmlFor="post">Show us your world</label>
            <Textarea
              placeholder="What about your world?.."
              id="post"
              className="mt-10 h-30 rounded border border-2 border-gray-900"
              value={post.caption}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPost({ ...post, caption: e.target.value })
              }
            />
            <label
              htmlFor="upload"
              className="font-bold text-start flex justify-start mt-4 items-start text-gray-900"
            >
              Photos
            </label>
            <FileUploaderRegular
              sourceList="local, url, camera, dropbox"
              classNameUploader="uc-light"
              pubkey="4dbac5aa7f40d2914d6b"
              className="mt-4 flex justify-start items-start"
              onChange={handleChangeEvent}
            />
            <div className="uploaded-photos mt-4">
              {fileEntry.files.length > 0 && (
                <div>
                  <h4 className="font-bold">Uploaded Photos:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {/* {fileEntry.files.map((file, index) => (
                      <img
                        key={index}
                        src={file.cdnUrl}
                        alt={`Uploaded file ${index + 1}`}
                        className="w-32 h-32 object-cover rounded"
                      />
                    ))} */}
                    {fileEntry.files.map((file, index) => (
  file.cdnUrl ? (
    <img
      key={index}
      src={file.cdnUrl}
      alt={`Uploaded file ${index + 1}`}
      className="w-32 h-32 object-cover rounded"
    />
  ) : null
))}
                  </div>
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="bg-gray-900 p-2 font-bold rounded mt-5 text-white flex items-start justify-start"
            >
              POST
            </Button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default CreatePost;
