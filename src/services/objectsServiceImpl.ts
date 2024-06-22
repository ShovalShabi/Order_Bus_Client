import axios from "axios";
import { ObjectBoundary } from "../bounderies/object/ObjectBoundary";
import ObjectsService from "./objectsService";
import getEnvVariables from "../etc/loadVariables";
import UserRoles from "../utils/UserRoles";

// Load environment variables from .env files
const envVariables = getEnvVariables();
const { baseParticipantsURL, authObjRoute } = envVariables;

// Define base URLs for different API endpoints related to objects
const participantsObjBaseUrl = baseParticipantsURL + "/objects";
const authResearchersObjBaseURL = authObjRoute;

// Helper function to get the correct base URL based on the user's role
function getBaseUrl(role: UserRoles): string {
  switch (role) {
    case UserRoles.Participant:
      return participantsObjBaseUrl;

    case UserRoles.Researcher:
    case UserRoles.Admin:
      return authResearchersObjBaseURL;
    default:
      throw new Error("Invalid user role");
  }
}

/**
 * Implementation of ObjectService interface that interacts with backend APIs.
 */
const objectService: ObjectsService = {
  /**
   * Creates a new object by sending a POST request to the objects endpoint.
   * @param newObjectBoundary - Object data to be created.
   * @param role - User role for determining the correct endpoint.
   * @returns Promise<ObjectBoundary> - Object data returned from the backend.
   */
  createObject: async function (
    newObjectBoundary: ObjectBoundary,
    role: UserRoles
  ): Promise<ObjectBoundary> {
    const baseUrl = getBaseUrl(role);
    const res = await axios.post(baseUrl, newObjectBoundary);
    const data: ObjectBoundary = res.data;
    return data;
  },

  /**
   * Retrieves an object by its ID by sending a GET request to the objects endpoint.
   * @param internalObjectId - ID of the object to retrieve.
   * @param role - User role for determining the correct endpoint.
   * @returns Promise<ObjectBoundary> - Object data returned from the backend.
   */
  getObjectById: async function (
    internalObjectId: string,
    role: UserRoles
  ): Promise<ObjectBoundary> {
    const baseUrl = getBaseUrl(role);
    const res = await axios.get(`${baseUrl}/${internalObjectId}`);
    const data: ObjectBoundary = res.data;
    return data;
  },

  /**
   * Updates an existing object by sending a PUT request to the objects endpoint.
   * @param objectToUpdate - Updated object data.
   * @param role - User role for determining the correct endpoint.
   * @returns Promise<void>
   */
  updateObject: async function (
    objectToUpdate: ObjectBoundary,
    role: UserRoles
  ): Promise<void> {
    const baseUrl = getBaseUrl(role);
    await axios.put(
      `${baseUrl}/${objectToUpdate.objectId.internalObjectId}`,
      objectToUpdate
    );
  },

  /**
   * Retrieves all objects based on specified criteria by sending a GET request to the objects endpoint.
   * @param role - User role for determining the correct endpoint.
   * @param queryParams - Optional query parameters to filter objects.
   * @returns Promise<ObjectBoundary[]> - Array of object data returned from the backend.
   */
  getAllObjects: async function (
    role: UserRoles,
    queryParams: Record<string, string | number | boolean> = {}
  ): Promise<ObjectBoundary[]> {
    const baseUrl = getBaseUrl(role);
    const res = await axios.get(baseUrl, { params: queryParams });
    return res.data as ObjectBoundary[];
  },

  /**
   * Deletes an object by its ID by sending a DELETE request to the objects endpoint.
   * @param objectId - ID of the object to delete.
   * @param role - User role for determining the correct endpoint.
   * @returns Promise<{ deleted: boolean }> - Confirmation of deletion.
   */
  deleteObject: async function (
    objectId: string,
    role: UserRoles
  ): Promise<{ deleted: boolean }> {
    const baseUrl = getBaseUrl(role);
    const res = await axios.delete(`${baseUrl}/${objectId}`);
    return res.data;
  },

  /**
   * Binds a child object to another object by sending a PUT request to the bind endpoint.
   * @param internalObjectId - ID of the parent object to bind.
   * @param email - User's email for permissions.
   * @param platform - User's platform for permissions.
   * @param childObj - The child object to bind.
   * @param role - User role for determining the correct endpoint.
   * @returns Promise<void>
   */
  bindChildObject: async function (
    internalObjectId: string,
    email: string,
    platform: string,
    childObj: ObjectBoundary,
    role: UserRoles
  ): Promise<void> {
    const baseUrl = getBaseUrl(role);
    await axios.put(`${baseUrl}/${internalObjectId}/bind`, childObj, {
      params: { email, platform },
    });
  },

  /**
   * Unbinds a child object from another object by sending a PUT request to the unbind endpoint.
   * @param internalObjectId - ID of the object to unbind.
   * @param email - User's email for permissions.
   * @param platform - User's platform for permissions.
   * @param childObj - The child object to unbind.
   * @param role - User role for determining the correct endpoint.
   * @returns Promise<void>
   */
  unbindChildObject: async function (
    internalObjectId: string,
    email: string,
    platform: string,
    childObj: ObjectBoundary,
    role: UserRoles
  ): Promise<void> {
    const baseUrl = getBaseUrl(role);
    await axios.put(`${baseUrl}/${internalObjectId}/unbind`, childObj, {
      params: { email, platform },
    });
  },

  /**
   * Retrieves all children objects of a specific object by sending a GET request to the children endpoint.
   * @param internalObjectId - ID of the parent object.
   * @param email - User's email for permissions.
   * @param platform - User's platform for permissions.
   * @param role - User role for determining the correct endpoint.
   * @returns Promise<ObjectBoundary[]> - Array of child object data returned from the backend.
   */
  getAllChildrenObjects: async function (
    internalObjectId: string,
    email: string,
    platform: string,
    role: UserRoles
  ): Promise<ObjectBoundary[]> {
    const baseUrl = getBaseUrl(role);
    const res = await axios.get(`${baseUrl}/${internalObjectId}/children`, {
      params: { email, platform },
    });
    return res.data as ObjectBoundary[];
  },

  /**
   * Retrieves all parent objects of a specific object by sending a GET request to the parents endpoint.
   * @param internalObjectId - ID of the child object.
   * @param email - User's email for permissions.
   * @param platform - User's platform for permissions.
   * @param role - User role for determining the correct endpoint.
   * @returns Promise<ObjectBoundary[]> - Array of parent object data returned from the backend.
   */
  getAllParentObjects: async function (
    internalObjectId: string,
    email: string,
    platform: string,
    role: UserRoles
  ): Promise<ObjectBoundary[]> {
    const baseUrl = getBaseUrl(role);
    const res = await axios.get(`${baseUrl}/${internalObjectId}/parents`, {
      params: { email, platform },
    });
    return res.data as ObjectBoundary[];
  },

  /**
   * Retrieves all objects of a specific type by sending a GET request to the objects endpoint with type filter.
   * @param targetType - The type of objects to retrieve.
   * @param role - User role for determining the correct endpoint.
   * @param queryParams - Optional query parameters for filtering.
   * @returns Promise<ObjectBoundary[]> - Array of object data of specific type returned from the backend.
   */
  getAllObjectsByType: async function (
    targetType: string,
    role: UserRoles,
    queryParams: Record<string, string | number | boolean> = {}
  ): Promise<ObjectBoundary[]> {
    const baseUrl = getBaseUrl(role);
    const res = await axios.get(`${baseUrl}/type/${targetType}`, {
      params: queryParams,
    });
    return res.data as ObjectBoundary[];
  },

  /**
   * Retrieves a specific object of a specific type by sending a GET request to the objects endpoint with type filter.
   * @param targetType - The type of object to retrieve.
   * @param role - User role for determining the correct endpoint.
   * @param queryParams - Optional query parameters for filtering.
   * @returns Promise<ObjectBoundary> - Object data of specific type returned from the backend.
   */
  getSpecificObjectByType: async function (
    targetType: string,
    role: UserRoles,
    queryParams: Record<string, string | number | boolean> = {}
  ): Promise<ObjectBoundary> {
    const baseUrl = getBaseUrl(role);
    const res = await axios.get(`${baseUrl}/type/distinct/${targetType}`, {
      params: queryParams,
    });
    return res.data as ObjectBoundary;
  },
  /**
   * Retrieves an array of children objects of a specific type and alias by sending a GET request to the objects endpoint with type filter.
   * @param targetType - The type of object to retrieve.
   * @param targetalias - The type of object to retrieve.
   * @param role - User role for determining the correct endpoint.
   * @param queryParams - Optional query parameters for filtering.
   * @returns Promise<ObjectBoundary[]> - An array of objects formed as ObjectBoundary by specific type and alias from the backend.
   */
  getChildrenByTypeAndAlias: async function (
    targetType: string,
    targetAlias: string,
    role: UserRoles,
    queryParams: Record<string, string | number | boolean> = {}
  ): Promise<ObjectBoundary[]> {
    const baseUrl = getBaseUrl(role);
    const res = await axios.get(
      `${baseUrl}/children/${targetType}/${targetAlias}`,
      {
        params: queryParams,
      }
    );
    return res.data as ObjectBoundary[];
  },
  /**
   * Retrieves an array of parents objects of a specific type and alias by sending a GET request to the objects endpoint with type filter.
   * @param targetType - The type of object to retrieve.
   * @param role - User role for determining the correct endpoint.
   * @param queryParams - Optional query parameters for filtering.
   * @returns Promise<ObjectBoundary[]> - An array of objects formed as ObjectBoundary by specific type and alias from the backend.
   */
  getParentsByTypeAndAlias: async function (
    targetType: string,
    targetAlias: string,
    role: UserRoles,
    queryParams: Record<string, string | number | boolean> = {}
  ): Promise<ObjectBoundary[]> {
    const baseUrl = getBaseUrl(role);
    const res = await axios.get(
      `${baseUrl}/parents/${targetType}/${targetAlias}`,
      {
        params: queryParams,
      }
    );
    return res.data as ObjectBoundary[];
  },
};

// Export the objectService object as default
export default objectService;
