import { ObjectBoundary } from "../bounderies/object/ObjectBoundary";
import UserRoles from "../utils/UserRoles";

/**
 * Interface representing an Object Service with various object-related operations.
 */
interface ObjectsService {
  /**
   * Creates a new object.
   * @param newObjectBoundary The object data to create.
   * @param role The role of the user, it can be Admin/Researcher/Participant.
   * @returns A Promise resolving to the created ObjectBoundary.
   * @throws {Error} If there is an error during the object creation process.
   */
  createObject(
    newObjectBoundary: ObjectBoundary,
    role: UserRoles
  ): Promise<ObjectBoundary>;

  /**
   * Retrieves an object by its ID.
   * @param internalObjectId The ID of the object to retrieve.
   * @param role The role of the user, it can be Admin/Researcher/Participant.
   * @returns A Promise resolving to the retrieved ObjectBoundary.
   * @throws {Error} If there is an error during the object retrieval process.
   */
  getObjectById(
    internalObjectId: string,
    role: UserRoles
  ): Promise<ObjectBoundary>;

  /**
   * Updates an existing object.
   * @param objectToUpdate The updated object data.
   * @param role The role of the user, it can be Admin/Researcher/Participant
   * @returns A Promise as void.
   * @throws {Error} If there is an error during the object update process.
   */
  updateObject(objectToUpdate: ObjectBoundary, role: UserRoles): Promise<void>;

  /**
   * Retrieves all objects based on specified criteria.
   * @param role The role of the user, it can be Admin/Researcher/Participant.
   * @param queryParams Optional query parameters to filter objects.
   * @returns A Promise resolving to an array of ObjectBoundary objects.
   * @throws {Error} If there is an error retrieving the objects.
   */
  getAllObjects(
    role: UserRoles,
    queryParams?: Record<string, string | number | boolean>
  ): Promise<ObjectBoundary[]>;

  /**
   * Deletes an object by its ID.
   * @param objectId The ID of the object to delete.
   * @param role The role of the user, it can be Admin/Researcher/Participant.
   * @returns A Promise resolving to an object containing deletion status.
   * @throws {Error} If there is an error deleting the object.
   */
  deleteObject(
    objectId: string,
    role: UserRoles
  ): Promise<{ deleted: boolean }>;

  /**
   * Binds a child object to another object by sending a PUT request to the bind endpoint.
   * @param internalObjectId - ID of the parent object to bind.
   * @param email - User's email for permissions.
   * @param platform - User's platform for permissions.
   * @param childObj - The child object to bind.
   * @param role - User role for determining the correct endpoint.
   * @returns Promise<void>
   */
  bindChildObject(
    internalObjectId: string,
    email: string,
    platform: string,
    childObj: ObjectBoundary,
    role: UserRoles
  ): Promise<void>;

  /**
   * Unbinds a child object from another object.
   * @param internalObjectId - ID of the parent object to unbind.
   * @param email User's email for permissions.
   * @param platform User's platform for permissions.
   * @param childObj - The child object to unbind.
   * @param role The role of the user, it can be Admin/Researcher/Participant.
   * @returns A Promise as void.
   * @throws {Error} If there is an error during the unbind operation.
   */
  unbindChildObject(
    objectId: string,
    email: string,
    platform: string,
    childObj: ObjectBoundary,
    role: UserRoles
  ): Promise<void>;

  /**
   * Retrieves all children objects of a specific object.
   * @param objectId The ID of the parent object.
   * @param email User's email for permissions.
   * @param platform User's platform for permissions.
   * @param role The role of the user, it can be Admin/Researcher/Participant.
   * @returns A Promise resolving to an array of ObjectBoundary objects.
   * @throws {Error} If there is an error retrieving the child objects.
   */
  getAllChildrenObjects(
    objectId: string,
    email: string,
    platform: string,
    role: UserRoles
  ): Promise<ObjectBoundary[]>;

  /**
   * Retrieves all parent objects of a specific object.
   * @param objectId The ID of the child object.
   * @param email User's email for permissions.
   * @param platform User's platform for permissions.
   * @param role The role of the user, it can be Admin/Researcher/Participant.
   * @returns A Promise resolving to an array of ObjectBoundary objects.
   * @throws {Error} If there is an error retrieving the parent objects.
   */
  getAllParentObjects(
    objectId: string,
    email: string,
    platform: string,
    role: UserRoles
  ): Promise<ObjectBoundary[]>;

  /**
   * Retrieves all objects of a specific type.
   * @param targetType The type of objects to retrieve.
   * @param role The role of the user, it can be Admin/Researcher/Participant.
   * @param queryParams Optional query parameters for filtering.
   * @returns A Promise resolving to an array of ObjectBoundary objects.
   * @throws {Error} If there is an error retrieving the objects by type.
   */
  getAllObjectsByType(
    targetType: string,
    role: UserRoles,
    queryParams?: Record<string, string | number | boolean>
  ): Promise<ObjectBoundary[]>;

  /**
   * Retrieves a specific object of a specific type.
   * @param targetType The type of object to retrieve.
   * @param role The role of the user, it can be Admin/Researcher/Participant.
   * @param queryParams Optional query parameters for filtering.
   * @returns A Promise resolving to the retrieved ObjectBoundary.
   * @throws {Error} If there is an error retrieving the specific object by type.
   */
  getSpecificObjectByType(
    targetType: string,
    role: UserRoles,
    queryParams?: Record<string, string | number | boolean>
  ): Promise<ObjectBoundary>;

  /**
   * Retrieves an array of children objects of a specific type and alias by sending a GET request to the objects endpoint with type filter.
   * @param targetType - The type of object to retrieve.
   * @param targetalias - The type of object to retrieve.
   * @param role - User role for determining the correct endpoint.
   * @param queryParams - Optional query parameters for filtering.
   * @returns Promise<ObjectBoundary[]> - An array of objects formed as ObjectBoundary by specific type and alias from the backend.
   */
  getChildrenByTypeAndAlias(
    targetType: string,
    targetAlias: string,
    role: UserRoles,
    queryParams: Record<string, string | number | boolean>
  ): Promise<ObjectBoundary[]>;
  /**
   * Retrieves an array of parents objects of a specific type and alias by sending a GET request to the objects endpoint with type filter.
   * @param targetType - The type of object to retrieve.
   * @param role - User role for determining the correct endpoint.
   * @param queryParams - Optional query parameters for filtering.
   * @returns Promise<ObjectBoundary[]> - An array of objects formed as ObjectBoundary by specific type and alias from the backend.
   */
  getParentsByTypeAndAlias(
    targetType: string,
    targetAlias: string,
    role: UserRoles,
    queryParams: Record<string, string | number | boolean>
  ): Promise<ObjectBoundary[]>;
}

export default ObjectsService;
