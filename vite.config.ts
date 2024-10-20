import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import getEnvVariables from "./src/etc/loadVariables"; // Utility for loading environment variables
import dotenv from "dotenv";

// Load environment variables from .env files
dotenv.config();
const envVariables = getEnvVariables();
const { port } = envVariables;

/**
 * Vite configuration file that sets up the React application with environment variables.
 * It configures:
 * - The React plugin for Vite.
 * - The development server port using environment variables.
 * - Defining `process.env` to be used in the application.
 *
 * @see https://vitejs.dev/config/ for more configuration options.
 */
export default defineConfig({
  // Add the Vite plugin for React
  plugins: [react()],

  // Configure the Vite development server
  server: {
    port, // Use the `port` variable loaded from environment settings
  },

  // Define global variables accessible in the app
  define: { "process.env": process.env },
});
