/**
 * Retrieves environment variables and returns them with appropriate defaults for development, production, and testing environments.
 *
 * @returns {Object} An object containing the following properties:
 *  - {number} port - The port number on which the server should run.
 *  - {string} env - The current environment (e.g., 'dev', 'prod', 'testing').
 *  - {string} apiGlobalKey - The Google Maps JavaScript API key.
 *  - {string} mapID - The map ID to be used in the application.
 *  - {string} orderBusURL - The URL for the Order Bus service (dev or prod based on the environment).
 *  - {string} feedbackURL - The URL for the Feedback service (dev or prod based on the environment).
 */
const getEnvVariables = () => {
  // Destructure the necessary environment variables from process.env
  const {
    VITE_DEV_PORT,
    VITE_PROD_PORT,
    VITE_ENV,
    VITE_JAVASCRIPT_MAPS_API_KEY,
    VITE_MAP_ID,
    VITE_ORDER_BUS_DEV_PORT,
    VITE_ORDER_BUS_PROD_PORT,
    VITE_ORDER_BUS_DEV_HOST,
    VITE_ORDER_BUS_PROD_HOST,
    VITE_FEEDBACK_DEV_PORT,
    VITE_FEEDBACK_PROD_PORT,
    VITE_FEEDBACK_DEV_HOST,
    VITE_FEEDBACK_PROD_HOST,
  } = process.env;

  // Set the environment (default to 'dev' if not defined)
  const env = VITE_ENV || "dev"; // Defaults to 'dev' environment

  // Retrieve Google Maps API key and Map ID, default to empty strings if not provided
  const apiGlobalKey = VITE_JAVASCRIPT_MAPS_API_KEY || "";
  const mapID = VITE_MAP_ID || "";

  let orderBusURL, feedbackURL, port;

  // Configure URLs and port based on the environment
  if (env === "dev") {
    // Use development values for dev environment
    port = parseInt(VITE_DEV_PORT || "6001", 10); // Default to port 6001
    orderBusURL = `http://${VITE_ORDER_BUS_DEV_HOST}:${VITE_ORDER_BUS_DEV_PORT}`;
    feedbackURL = `http://${VITE_FEEDBACK_DEV_HOST}:${VITE_FEEDBACK_DEV_PORT}`;
  } else if (env === "prod") {
    // Use production values for prod environment
    port = parseInt(VITE_PROD_PORT || "7001", 10); // Default to port 7001
    orderBusURL = `http://${VITE_ORDER_BUS_PROD_HOST}:${VITE_ORDER_BUS_PROD_PORT}`;
    feedbackURL = `http://${VITE_FEEDBACK_PROD_HOST}:${VITE_FEEDBACK_PROD_PORT}`;
  } else {
    // Use dev URLs for testing environment
    port = 0; // Default to port 0 for testing
    orderBusURL = `http://${VITE_ORDER_BUS_DEV_HOST}:${VITE_ORDER_BUS_DEV_PORT}`;
    feedbackURL = `http://${VITE_FEEDBACK_DEV_HOST}:${VITE_FEEDBACK_DEV_PORT}`;
  }

  // Return the environment variables as an object
  return {
    port,
    env,
    apiGlobalKey,
    mapID,
    orderBusURL,
    feedbackURL,
  };
};

// Export the function for use in other parts of the application
export default getEnvVariables;
