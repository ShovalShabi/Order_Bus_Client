// import dotenv and call config to load variables into process.env
import dotenv from "dotenv";
dotenv.config();

// Define a function to retrieve environment variables
const getEnvVariables = () => {
  const {
    VITE_PORT,
    VITE_ENV,
    VITE_REACT_APP_BACKEND_DEV_URL,
    VITE_REACT_APP_BACKEND_PROD_URL,
  } = process.env;

  // Validate required variables or provide default values
  const port = parseInt(VITE_PORT || "6001", 10); // Default to 3001 if VITE_PORT is not defined
  const env = VITE_ENV || "dev"; // Default to 'dev' if VITE_ENV is not defined

  const backendURL =
    process.env.VITE_ENV !== "prod"
      ? VITE_REACT_APP_BACKEND_DEV_URL
      : VITE_REACT_APP_BACKEND_PROD_URL || "http://localhost:3000"; // Choosing the backend URL based on the enviorment variable, using the dev URL as default

  const authURL = backendURL + "/auth";

  const baseParticipantsURL = backendURL + "/participnats";

  const entryURL = backendURL + "/entry";

  const authObjRoute = authURL + "/objects";

  const authUsersURL = authURL + "/users";

  const commandsURL = authURL + "/commands";

  return {
    port,
    env,
    backendURL,
    baseParticipantsURL,
    entryURL,
    authObjRoute,
    authUsersURL,
    commandsURL,
  };
};

export default getEnvVariables;
