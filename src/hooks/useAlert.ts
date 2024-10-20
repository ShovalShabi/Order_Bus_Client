import { useContext } from "react";
import { AlertContext } from "../components/AlertProvider";

/**
 * Custom hook to access the alert context for managing global alerts in the application.
 *
 * This hook provides access to the alert state and the `setAlert` function,
 * which can be used to trigger alerts in the application. The alerts include messages
 * and severity levels such as "error", "warning", "info", and "success".
 *
 * @throws Will throw an error if this hook is used outside of the `AlertProvider`.
 *
 * @returns {AlertContextType} The alert context, containing the current alert state and the `setAlert` function.
 */
const useAlert = () => {
  // Retrieve the alert context using the useContext hook
  const context = useContext(AlertContext);

  // Throw an error if the hook is used outside of the AlertProvider component
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }

  // Return the context if valid
  return context;
};

export default useAlert;
