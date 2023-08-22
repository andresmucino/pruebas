import { EuiGlobalToastList } from "@elastic/eui";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { createContext, ReactNode, useState } from "react";
import React from "react";

export type ToastsContextType = {
  globalToasts: JSX.Element;
  pushToast: (toast: Toast[]) => void;
};

export const ToastsContext = createContext<ToastsContextType | undefined>(
  undefined,
);

interface ToastsProviderProps {
  children: ReactNode;
}

export const ToastsProvider = ({
  children,
}: ToastsProviderProps): JSX.Element => {
  const [toastId, setToastId] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (removedToast: any) => {
    setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
  };

  const pushToast = (newToasts: Toast[]) => {
    const newToastsWithId = Array.from(newToasts, (toast) => {
      setToastId(toastId + 1);
      return {
        ...toast,
        id: `toast${toastId}`,
      };
    });
    const newToastList = [...toasts, ...newToastsWithId];
    setToasts(newToastList);
  };

  const globalToasts = (
    <EuiGlobalToastList
      toasts={toasts}
      dismissToast={removeToast}
      toastLifeTimeMs={6000}
    />
  );

  return (
    <ToastsContext.Provider
      value={{
        globalToasts,
        pushToast,
      }}
    >
      {children}
    </ToastsContext.Provider>
  );
};