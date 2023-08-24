"use client";

import { createContext, useEffect, useState } from "react";
import { auth } from "../../config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export type AuthContextType = {
  user: any;
  loginEmailAndPassword: (email: string, password: string) => void;
  signOut: () => void;
  loading: any;
  userState: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<any>();
  const [loading, userState] = useAuthState(auth);
  const router = useRouter();

  const loginEmailAndPassword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        if (error) {
          alert("Correo/contreaseña invalidos");
        }
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  if (typeof window !== "undefined") {
    window.localStorage.setItem("user", JSON.stringify(user));
  }

  const signOut = () => auth.signOut();

  return (
    <AuthContext.Provider
      value={{
        user,
        loginEmailAndPassword,
        signOut,
        loading,
        userState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
