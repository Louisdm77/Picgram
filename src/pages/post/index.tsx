import * as React from "react";
import Layout from "../../components/layout";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui//button";
import {
  FileUploaderRegular,
  type UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useUserAuth } from "@/assets/context/userAuthContext";
import { FileEntry, Post } from "../../types";
import { OutputFileEntry } from "@uploadcare/file-uploader";

interface ICreatePostProps {}

type FileUploaderProps = {
  uploaderClassName: string;
  files: OutputFileEntry[];
  onChange: (files: OutputFileEntry[]) => void;
};

const CreatePost: React.FunctionComponent<ICreatePostProps> = ({
  uploaderClassName,
  files,
  onChange,
}: FileUploaderProps) => {

  const { user } = useUserAuth();
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({ files: [] });

  const handleChangeEvent = (files{ allEntries: OutputFileEntry[] }) => {
    setUploadedFiles([
      ...files.allEntries.filter((f: OutputFileEntry) => f.status === "success"),
    ] as OutputFileEntry<"success">[]);
  };

  const [post, setPost] = React.useState<Post>({
    caption: "",
    photos: [],
    likes: 0,
    userLikes: [],
    userId: "",
    date: new Date(),
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("The file is :", fileEntry);
    console.log("the post is:", post);
    setPost({
      caption: "",
      photos: [],
      likes: 0,
      userLikes: [],
      userId: "",
      date: new Date(),
    });
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
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setPost({ ...post, caption: e.target.value });
              }}
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
              pubkey="7034120474d577e8a991"
              className="mt-4 flex justify-start items-start "
            />
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
