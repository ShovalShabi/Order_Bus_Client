// import dotenv and call config to load variables into process.env

// Define a function to retrieve environment variables
const getEnvVariables = () => {
  const {
    VITE_PORT,
    VITE_ENV,
    VITE_HOST_TYPE,
    VITE_JAVASCRIPT_MAPS_API_KEY,
    VITE_MAP_ID,
    VITE_ORDER_BUS_PORT,
    VITE_FEEDBACK_PORT,
  } = process.env;

  // Validate required variables or provide default values
  const port = parseInt(VITE_PORT || "6001", 10); // Default to 3001 if VITE_PORT is not defined
  const env = VITE_ENV || "dev"; // Default to 'dev' if VITE_ENV is not defined

  const apiGlobalKey = VITE_JAVASCRIPT_MAPS_API_KEY || "";

  const mapID = VITE_MAP_ID || "";

  //TODO: Need to specify between two environments by VITE_ENV
  const orderBusURL = `http://${VITE_HOST_TYPE}:${VITE_ORDER_BUS_PORT}`;

  const feedbackURL = `http://${VITE_HOST_TYPE}:${VITE_FEEDBACK_PORT}`;

  return {
    port,
    env,
    apiGlobalKey,
    mapID,
    orderBusURL,
    feedbackURL,
  };
};

export default getEnvVariables;
