import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import getEnvVariables from "./src/etc/loadVariables"; // Import the dotenv-flow package for loading environment variables

// Load environment variables from .env files
const envVariables = getEnvVariables();
const { port } = envVariables;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port, // Use the PORT environment variable
  },
});
