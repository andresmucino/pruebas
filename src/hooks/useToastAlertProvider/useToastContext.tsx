import { useContext } from "react";
import { ToastsContext, ToastsContextType } from "./toastProviders";

export const useToastsContext = (): ToastsContextType => {
  const context = useContext(ToastsContext);
  if (context === undefined) {
    throw new Error("useToastsContext must be used within a ToastsProvider");
  }
  return context;
};
