/**
 * Retrieves environment variables and returns them with appropriate defaults
 * for development, production, and testing environments.
 *
 * This function reads environment variables (injected through Vite or other methods),
 * constructs URLs for different services, and determines port configurations based on
 * the current environment. It provides a unified object with all necessary environment
 * configurations.
 *
 * @returns {Object} An object containing the following properties:
 *  - {number} port - The port number on which the server should run.
 *  - {string} env - The current environment ('dev', 'prod', or 'testing').
 *  - {string} apiGlobalKey - The Google Maps JavaScript API key for the project.
 *  - {string} mapID - The map ID to be used in the Google Maps integration.
 *  - {string} orderBusURL - The URL for the Order Bus service (changes based on the environment).
 *  - {string} feedbackURL - The URL for the Feedback service (changes based on the environment).
 *  - {string} webSocketOrderBusServiceURL - The WebSocket URL for the Order Bus service.
 */
const getEnvVariables = () => {
  // Destructure the necessary environment variables from process.env
  const {
    VITE_DEV_PORT, // The port used in development
    VITE_PROD_PORT, // The port used in production
    VITE_ENV, // The current environment (e.g., dev, prod)
    VITE_JAVASCRIPT_MAPS_API_KEY, // The Google Maps API key
    VITE_MAP_ID, // The Google Maps Map ID
    VITE_BACKEND_HOST, // Backend server host
    VITE_BACKEND_PORT, // Backend server port
    VITE_ORDER_BUS_SERVICE_ENDPOINT, // Endpoint for Order Bus service
    VITE_FEEDBACK_SERVICE_ENDPOINT, // Endpoint for Feedback service
    VITE_ORDER_BUS_SRVICE_WS_ENDPOINT, // WebSocket endpoint for Order Bus service
  } = process.env;

  // Determine the current environment (defaults to 'dev' if undefined)
  const env = VITE_ENV || "dev";

  // Retrieve Google Maps API key and Map ID, fallback to empty strings if not provided
  const apiGlobalKey = VITE_JAVASCRIPT_MAPS_API_KEY || "";
  const mapID = VITE_MAP_ID || "";

  let port = 0;

  // Configure port based on environment
  if (env === "dev") {
    // Development environment: use development port, defaulting to 6001
    port = parseInt(VITE_DEV_PORT || "6001", 10);
  } else if (env === "prod") {
    // Production environment: use production port, defaulting to 7001
    port = parseInt(VITE_PROD_PORT || "7001", 10);
  } else {
    // Default to port 0 for other cases (e.g., testing)
    port = 0;
  }

  // Construct URLs for services based on environment variables
  const orderBusURL = `http://${VITE_BACKEND_HOST}:${VITE_BACKEND_PORT}/${VITE_ORDER_BUS_SERVICE_ENDPOINT}`;
  const feedbackURL = `http://${VITE_BACKEND_HOST}:${VITE_BACKEND_PORT}/${VITE_FEEDBACK_SERVICE_ENDPOINT}`;
  const webSocketOrderBusServiceURL = `ws://${VITE_BACKEND_HOST}:${VITE_BACKEND_PORT}/${VITE_ORDER_BUS_SRVICE_WS_ENDPOINT}`;

  // Return the gathered and constructed environment variables
  return {
    port,
    env,
    apiGlobalKey,
    mapID,
    orderBusURL,
    feedbackURL,
    webSocketOrderBusServiceURL,
  };
};

// Export the function for use in other parts of the application
export default getEnvVariables;
