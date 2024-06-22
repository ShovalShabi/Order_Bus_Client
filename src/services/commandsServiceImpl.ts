import axios from "axios";
import CommandsService from "./commandsService";
import getEnvVariables from "../etc/loadVariables";
import UserRoles from "../utils/UserRoles";
import { CommandBoundary } from "../bounderies/command/CommandBoundary";

// Load environment variables from .env files
const envVariables = getEnvVariables();
const { backendURL } = envVariables;

// Define base URLs for different API endpoints related to commands
const authCommandsBaseUrl = backendURL + "/auth/commands";

// Helper function to get the correct base URL based on the user's role
function getBaseUrl(role: UserRoles): string {
  if (role === UserRoles.Admin || role === UserRoles.Researcher) {
    return authCommandsBaseUrl;
  }
  throw new Error("Invalid user role");
}

/**
 * Implementation of CommandsService interface that interacts with backend APIs.
 */
const commandsService: CommandsService = {
  /**
   * Creates a new command by sending a POST request to the commands endpoint.
   * @param newCommandBoundary - Command data to be created.
   * @param role - User role for determining the correct endpoint.
   * @returns Promise<CommandBoundary> - Command data returned from the backend.
   */
  createCommand: async function (
    newCommandBoundary: CommandBoundary,
    role: UserRoles
  ): Promise<CommandBoundary> {
    const baseUrl = getBaseUrl(role);
    const res = await axios.post(baseUrl, newCommandBoundary);
    const data: CommandBoundary = res.data;
    return data;
  },

  /**
   * Retrieves all commands based on specified criteria by sending a GET request to the commands endpoint.
   * @param email - The email of the user.
   * @param platform - The platform of the user.
   * @returns Promise<CommandBoundary[]> - Array of command data returned from the backend.
   */
  getAllCommands: async function (
    email: string,
    platform: string
  ): Promise<CommandBoundary[]> {
    const res = await axios.get(authCommandsBaseUrl, {
      params: { email, platform },
    });
    return res.data as CommandBoundary[];
  },

  /**
   * Deletes all commands based on specified criteria by sending a DELETE request to the commands endpoint.
   * @param email - The email of the user.
   * @param platform - The platform of the user.
   * @returns Promise<{ n: number; deletedCount: number; ok: number }> - Deletion statistics returned from the backend.
   */
  deleteAllCommands: async function (
    email: string,
    platform: string
  ): Promise<{ n: number; deletedCount: number; ok: number }> {
    const res = await axios.delete(authCommandsBaseUrl, {
      params: { email, platform },
    });
    return res.data;
  },
};

// Export the commandsService object as default
export default commandsService;
