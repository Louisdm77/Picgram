import { db } from "../assets/firebaseConfig";
import {
  doc,
  addDoc,
  collection,
  query,
  getDoc,
  orderBy,
  getDocs,
  where,
} from "firebase/firestore";
import { Post } from "@/types";

const COLLECTION_NAME = "posts";

export const createPost = (post: Post) => {
  return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getAllPosts = () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
  return getDocs(q);
};

export const getPostById = (id: string) => {
  const q = query(collection(db, COLLECTION_NAME), where("userId", "==", "id"));
  return getDocs(q);
};

export const getPost = (id: string) => {
  const docRef = doc(collection(db, COLLECTION_NAME), id);
  return getDoc(docRef);
};

