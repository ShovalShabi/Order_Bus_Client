import { createContext, useState, ReactNode } from "react";

/**
 * @interface AlertContextType
 * Describes the structure of the alert context object, which includes:
 * - `alert`: The current alert message and its severity level.
 * - `setAlert`: A function to update the current alert.
 */
interface AlertContextType {
  /**
   * @property {Object | null} alert - The alert object containing the message and severity or `null` if no alert is active.
   * @property {string | ReactNode} alert.message - The message to display in the alert. Can be a string or a React component.
   * @property {"error" | "warning" | "info" | "success"} alert.severity - The severity level of the alert.
   */
  alert: {
    message: string | ReactNode;
    severity: "error" | "warning" | "info" | "success";
  } | null;

  /**
   * @method setAlert
   * Updates the alert object.
   * @param {Object | null} alert - The new alert object containing the message and severity, or `null` to clear the alert.
   */
  setAlert: (
    alert: {
      message: string | ReactNode;
      severity: "error" | "warning" | "info" | "success";
    } | null
  ) => void;
}

/**
 * @constant AlertContext
 * The context object that will be used to provide and consume alert values throughout the component tree.
 */
export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

/**
 * @function AlertProvider
 * A React context provider that manages the state of the alert system.
 * @param {ReactNode} children - The child components that will have access to the alert context.
 * @returns {JSX.Element} - A provider component that wraps its children in `AlertContext`.
 */
export const AlertProvider = ({ children }: { children: ReactNode }) => {
  /**
   * @constant alert
   * The current state of the alert object, initialized to `null`.
   *
   * @constant setAlert
   * A function to update the alert object.
   */
  const [alert, setAlert] = useState<AlertContextType["alert"]>(null);
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
