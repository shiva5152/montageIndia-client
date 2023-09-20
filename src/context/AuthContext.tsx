"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
  User,
  signInWithEmailLink,
  isSignInWithEmailLink,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/config/firebase";
interface myUser {
  displayName: string;
  email: string;
  uid: string;
  emailVerified: Boolean;
}
interface AuthContextType {
  loading: Boolean;
  userLoading: Boolean;
  user: User | null; // User or null if not authenticated
  login: (username: string, password: string) => void;
  signup: (username: string, password: string) => void;
  loginWithGoogle: () => void;
  logout: () => void;
  handleSignInWithEmailLink: (url: string) => void;
  sendLinkSign: (email: string) => void;
}
let userr: User | null = null;
if (typeof window === "object") {
  userr = JSON.parse(window.localStorage.getItem("user") as string);
}
const initialAuthState: AuthContextType = {
  user: userr,
  userLoading: false,
  loading: false,
  login: (username: string, password: string) => {},
  signup: (username: string, password: string) => {},
  loginWithGoogle: () => {},
  logout: () => {},
  handleSignInWithEmailLink: () => {},
  sendLinkSign: () => {},
};
const AuthContext = createContext<AuthContextType>(initialAuthState);

// function storeUser(user: myUser) {
//   localStorage.setItem("user", JSON.stringify(user));
// }
// function getUser() {
//   const userStr = localStorage.getItem("user");
//   let user = null;
//   if (userStr) user = JSON.parse(userStr);

//   console.log(user);
//   return user;
// }
// const globalUser = getUser();
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(userr);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  const signup = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const tempUser = {
        uid: result?.user?.uid,
        displayName: result?.user?.displayName as string,
        email: result?.user?.email as string,
        emailVerified: result?.user?.emailVerified,
      };
      if (result?.user) sendEmailVerification(result?.user);
      alert("check your in box we have send you email verification Link");
      // addUserToDb({
      //   name: result?.user?.displayName as string,
      //   email: result?.user?.email as string,
      // });
      setUser(tempUser);
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const tempUser = {
        uid: result?.user?.uid,
        displayName: result?.user?.displayName as string,
        email: result?.user?.email as string,
        emailVerified: result?.user?.emailVerified,
      };

      setUser(tempUser);
      window.localStorage.setItem("user", JSON.stringify(tempUser));
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  };
  const loginWithGoogle = async () => {
    console.log("clicked");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const tempUser = {
        uid: result?.user?.uid,
        displayName: result?.user?.displayName as string,
        email: result?.user?.email as string,
        emailVerified: result?.user?.emailVerified,
      };
      setUser(tempUser);
      addUserToDb({
        name: result?.user?.displayName as string,
        email: result?.user?.email as string,
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const sendLinkSign = async (email: string) => {
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: "http://localhost:3000/login",
        handleCodeInApp: true,
      });
      alert("check your in box we have send you email verification Link");

      window.localStorage.setItem("emailForSignIn", email);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignInWithEmailLink = async (url: string) => {
    console.log("called");
    if (isSignInWithEmailLink(auth, url)) {
      console.log("in the auth");
      let email = window.localStorage.getItem("emailForSignIn") as string;
      if (!email) {
        email = window.prompt(
          "Please provide your email for confirmation"
        ) as string;
      }

      try {
        const result = await signInWithEmailLink(
          auth,
          email,
          window.location.href
        );
        console.log(result);
        window.localStorage.removeItem("emailForSignIn");
        // Dispatch an action to handle the successful sign-in, e.g., update user in Redux store
      } catch (error) {
        // Dispatch an action to handle the error, e.g., display error message
        console.log(error);
      }
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    await signOut(auth);
  };
  const addUserToDb = async (postData: { name: string; email: string }) => {
    try {
      console.log("adduser called");
      const response = await fetch(
        "http://localhost:8000/api/v1/user/addUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(postData),
        }
      );
      const data = await response;
      console.log("from response", data);
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };
  useEffect(() => {
    setUserLoading(true);
    console.log("from the auth", loading);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
        });
        console.log(user);
      } else {
        setUser(null);
      }
    });
    setUserLoading(false);
    console.log("from the auth", loading);

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userLoading,
        login,
        signup,
        loginWithGoogle,
        logout,
        handleSignInWithEmailLink,
        sendLinkSign,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
