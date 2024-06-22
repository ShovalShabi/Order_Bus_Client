import { ObjectIdBoundaryImpl } from "../../bounderies/object/ObjectIdBoundary";

interface ObjectIdInvokerImpl {
  objectId: ObjectIdBoundaryImpl;
  equals(other: ObjectIdInvokerImpl): boolean;
}

export type { ObjectIdInvokerImpl };

/**
 * Represents an ObjectIdInvoker responsible for invoking methods from ObjectIdBoundary.
 * @class
 */
class ObjectIdInvoker {
  /**
   * Create an ObjectIdInvoker.
   * @constructor
   * @param {ObjectIdBoundaryImpl} objectId - The instance of ObjectIdBoundary.
   */
  constructor(public objectId: ObjectIdBoundaryImpl) {}

  /**
   * Checks if this ObjectIdInvoker is equal to another object.
   * @param {ObjectIdInvoker} other - The object to compare with.
   * @returns {boolean} True if the objects are equal, false otherwise.
   */
  equals(other: ObjectIdInvoker): boolean {
    if (this === other) return true;
    if (other === null || this.constructor !== other.constructor) return false;
    return this.objectId.equals(other.objectId);
  }
}

/**
 * Exporting the ObjectIdInvoker class for further use by other modules if needed.
 * @type {ObjectIdInvoker}
 */
export default ObjectIdInvoker;
