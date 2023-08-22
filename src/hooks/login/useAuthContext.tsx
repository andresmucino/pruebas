import { useContext } from "react";
import { AuthContext, AuthContextType } from "./authProvider";

export const UseAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthConext must be used within a AuthProvider");
  }
  return context;
};
