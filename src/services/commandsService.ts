import { CommandBoundary } from "../bounderies/command/CommandBoundary";
import UserRoles from "../utils/UserRoles";

/**
 * Interface representing a Command Service with various command-related operations.
 */
interface CommandsService {
  /**
   * Creates a new command.
   * @param newCommandBoundary The command data to create.
   * @param role The role of the user, it can be Admin or Researcher.
   * @returns A Promise resolving to the created CommandBoundary.
   * @throws {Error} If there is an error during the command creation process.
   */
  createCommand(
    newCommandBoundary: CommandBoundary,
    role: UserRoles
  ): Promise<CommandBoundary>;

  /**
   * Retrieves all commands based on specified criteria.
   * @param email The email of the user.
   * @param platform The platform of the user.
   * @returns A Promise resolving to an array of CommandBoundary objects.
   * @throws {Error} If there is an error retrieving the commands.
   */
  getAllCommands(email: string, platform: string): Promise<CommandBoundary[]>;

  /**
   * Deletes all commands based on specified criteria.
   * @param email The email of the user.
   * @param platform The platform of the user.
   * @returns A Promise resolving to an object containing deletion statistics.
   * @throws {Error} If there is an error deleting the commands.
   */
  deleteAllCommands(
    email: string,
    platform: string
  ): Promise<{ n: number; deletedCount: number; ok: number }>;
}

export default CommandsService;
