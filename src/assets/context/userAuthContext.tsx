import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebaseConfig";

// create UserAuthType, the type specification for the context

type UserAuthType = {
  user: User | null;
  logIn: typeof logIn;
  signUp: typeof signUp;
  logOut: typeof logOut;
  googleSignIn: typeof googleSignIn;
};

const logIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
  }
};

const signUp = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
  }
};
const googleSignIn = async () => {
  try {
    const googleAuthProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleAuthProvider);
  } catch (err) {
    console.log(err);
  }
};

//create the context to be shared with the other components

const userAuthContext = createContext<UserAuthType>({
  user: null,
  logIn,
  signUp,
  logOut,
  googleSignIn,
});

//create a provider component with children as prop(the components that will be served the context)

export const UserAuthProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); //create a state that updates the user(active | loggedOut)

  //  use useeffect to listen for changes in the login and logout status
  useEffect(() => {
    // onAuthstatechanged used to check if the auth state is changed  inisde the useeffect
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });

    return () => {
      unsubscribe(); // perform a cleanup after every effect
    };
  }, []);

  const value: UserAuthType = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
  };

  //wrap the children in a provider tag with the contexts to be provided to the children
  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
};

//create a custom hook to be exported and used as reference to the other components
export const useUserAuth = () => {
  return useContext(userAuthContext);
};

///context is divided into 3 steps

/// create the context and provide the data types we want to share
/// create a provider component with the children props
/// wrap the children in the context tag.Provider and set the value to be shared
///  create a custom hook for sharing of the context with other component
