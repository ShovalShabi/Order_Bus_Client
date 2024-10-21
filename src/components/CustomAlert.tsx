import { Snackbar, Alert } from "@mui/material";
import useAlert from "../hooks/useAlert";

/**
 * @function CustomAlert
 * A React component that displays an alert using Material-UI's Snackbar and Alert components.
 * It retrieves the current alert state and the `setAlert` function from the `useAlert` hook.
 *
 * @returns {JSX.Element} - A component that conditionally renders a snackbar alert.
 */
const CustomAlert = () => {
  // Destructure the `alert` object and `setAlert` function from the custom `useAlert` hook
  const { alert, setAlert } = useAlert();

  /**
   * @function handleClose
   * Closes the alert by setting the alert state to `null`, which effectively hides the Snackbar.
   */
  const handleClose = () => {
    setAlert(null); // Clears the current alert
  };

  return (
    <>
      {/* Conditionally render the Snackbar and Alert only if an alert exists */}
      {alert && (
        <Snackbar
          open={true}
          autoHideDuration={6000} // Automatically close after 6 seconds
          onClose={handleClose} // Trigger handleClose when Snackbar is closed
        >
          <Alert
            variant="filled" // Use the filled variant for the alert style
            onClose={handleClose} // Trigger handleClose when Alert close button is clicked
            severity={alert.severity} // Severity of the alert (error, warning, info, or success)
            sx={{ width: "100%" }} // Set alert to occupy full width
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default CustomAlert;
