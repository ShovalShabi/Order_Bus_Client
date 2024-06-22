import axios from "axios";
import { UserBoundary } from "../bounderies/user/UserBoundary";
import UsersService from "./usersService";
import getEnvVariables from "../etc/loadVariables";

// Load environment variables from .env files
const envVariables = getEnvVariables();
const { backendURL } = envVariables;

// Define base URLs for different API endpoints
const entryBaseUrl = backendURL + "/entry";
const authResearchersBaseUrl = backendURL + "/auth/researchers";

/**
 * Implementation of UsersService interface that interacts with backend APIs.
 */
const usersService: UsersService = {
  /**
   * Creates a new user.
   * @param newUserBoundary The user data to create.
   * @returns A Promise resolving to the created UserBoundary.
   */
  createUser: async function (
    newUserBoundary: UserBoundary
  ): Promise<UserBoundary> {
    const res = await axios.post(`${entryBaseUrl}/register`, newUserBoundary);
    return res.data;
  },

  /**
   * Logs in an existing user.
   * @param email The email of the user.
   * @param platform The platform of the user.
   * @returns A Promise resolving to the logged-in UserBoundary.
   */
  login: async function (
    email: string,
    platform: string
  ): Promise<UserBoundary> {
    const res = await axios.post(`${entryBaseUrl}/login`, { email, platform });
    return res.data;
  },

  /**
   * Updates an existing user.
   * @param email The email of the user.
   * @param platform The platform of the user.
   * @param userToUpdate The updated user data.
   */
  updateUser: async function (
    email: string,
    platform: string,
    userToUpdate: UserBoundary
  ): Promise<void> {
    const url = `${authResearchersBaseUrl}/${email}/${platform}`;
    await axios.put(url, userToUpdate);
  },

  /**
   * Retrieves all users based on specified criteria.
   * @param email The email of the user.
   * @param platform The platform of the user.
   * @returns A Promise resolving to an array of UserBoundary objects.
   */
  getAllUsers: async function (
    email: string,
    platform: string
  ): Promise<UserBoundary[]> {
    const url = `${authResearchersBaseUrl}/${email}/${platform}`;
    const res = await axios.get(url);
    return res.data;
  },

  /**
   * Deletes all users based on specified criteria.
   * @param email The email of the user.
   * @param platform The platform of the user.
   * @returns A Promise resolving to an object containing deletion statistics.
   */
  deleteAllUsers: async function (
    email: string,
    platform: string
  ): Promise<{ n: number; deletedCount: number; ok: number }> {
    const url = `${authResearchersBaseUrl}/${email}/${platform}`;
    const res = await axios.delete(url);
    return res.data;
  },
};

// Export the usersService object as default
export default usersService;
