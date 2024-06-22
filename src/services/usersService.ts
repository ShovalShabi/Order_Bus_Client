import { UserBoundary } from "../bounderies/user/UserBoundary";

/**
 * Interface representing a User Service with various user-related operations.
 */
interface UsersService {
  /**
   * Creates a new user.
   * @param newUserBoundary The user data to create.
   * @returns A Promise resolving to the created UserBoundary.
   * @throws {Error} If there is an error during the user creation process.
   */
  createUser(newUserBoundary: UserBoundary): Promise<UserBoundary>;

  /**
   * Logs in an existing user.
   * @param email The email of the user.
   * @param platform The platform of the user.
   * @returns A Promise resolving to an object containing user body.
   * @throws {Error} If login fails due to incorrect credentials or other errors.
   */
  login(email: string, platform: string): Promise<UserBoundary>;

  /**
   * Updates an existing user.
   * @param email The email of the user.
   * @param platform The platform of the user.
   * @param userToUpdate The updated user data.
   * @returns A Promise as void.
   * @throws {Error} If there is an error during the user update process.
   */
  updateUser(
    email: string,
    platform: string,
    userToUpdate: UserBoundary
  ): Promise<void>;

  /**
   * Retrieves all users based on specified criteria.
   * @param email The email of the user.
   * @param platform The platform of the user.
   * @returns A Promise resolving to an array of UserBoundary objects.
   * @throws {Error} If there is an error retrieving the users.
   */
  getAllUsers(email: string, platform: string): Promise<UserBoundary[]>;

  /**
   * Deletes all users based on specified criteria.
   * @param email The email of the user.
   * @param platform The platform of the user.
   * @returns A Promise resolving to an object containing deletion statistics.
   * @throws {Error} If there is an error deleting the users.
   */
  deleteAllUsers(
    email: string,
    platform: string
  ): Promise<{ n: number; deletedCount: number; ok: number }>;
}

export default UsersService;
