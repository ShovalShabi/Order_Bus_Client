import { Snackbar, Alert } from "@mui/material";
import useAlert from "../../hooks/useAlert";

const CustomAlert = () => {
  const { alert, setAlert } = useAlert();

  const handleClose = () => {
    setAlert(null);
  };

  return (
    <>
      {alert && (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            variant="filled"
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default CustomAlert;
