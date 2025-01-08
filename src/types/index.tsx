import { OutputFileEntry } from "@uploadcare/react-uploader";

export interface UserSignIn {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogIn {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Post {
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  userLikes: [];
  userId: string;
  date: Date;
}

export interface PhotoMeta {
  cdnUrl: string;
  uuid: string;
}

export interface FileEntry {
  files: OutputFileEntry[];
}
