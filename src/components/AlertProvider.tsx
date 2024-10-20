import { createContext, useState, ReactNode } from "react";

interface AlertContextType {
  alert: {
    message: string | ReactNode;
    severity: "error" | "warning" | "info" | "success";
  } | null;
  setAlert: (
    alert: {
      message: string | ReactNode;
      severity: "error" | "warning" | "info" | "success";
    } | null
  ) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertContextType["alert"]>(null);
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
