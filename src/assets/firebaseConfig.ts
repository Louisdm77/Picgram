import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// The web app's Firebase configuration
// The keys were gotten from the .env file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig); // Important!!   (Initialize Firebase)
export const auth = getAuth(app); // get the Auth instance of the app using firebase authentication sdk (important for user login)
export const db = getFirestore(app); // get the firestore database instance (important!)
