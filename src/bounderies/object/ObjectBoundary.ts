import { LocationImpl } from "../../utils/Location";
import { UserIdInvokerImpl } from "../../utils/invokers/UserIdInvoker";
import { ObjectIdBoundaryImpl } from "./ObjectIdBoundary";

/**
 * Represents a ObjectBoundary that contains information about an object within the platform.
 * @interface
 */
interface ObjectBoundaryImpl {
  objectId: ObjectIdBoundaryImpl;
  type: string;
  alias: string;
  active: boolean;
  creationTimestamp?: Date;
  modificationTimestamp?: Date;
  location?: LocationImpl;
  createdBy: UserIdInvokerImpl;
  objectDetails: Record<
    string,
    | object
    | string
    | boolean
    | number
    | object[]
    | string[]
    | boolean[]
    | number[]
  >;
}

export type { ObjectBoundaryImpl };

/**
 * Represents a ObjectBoundary that contains information about an object within the platform.
 * @class
 */
class ObjectBoundary implements ObjectBoundaryImpl {
  constructor(
    public objectId: ObjectIdBoundaryImpl,
    public type: string,
    public alias: string,
    public active: boolean,
    public createdBy: UserIdInvokerImpl,
    public objectDetails: Record<
      string,
      | object
      | string
      | boolean
      | number
      | object[]
      | string[]
      | boolean[]
      | number[]
    >,
    public location?: LocationImpl,
    public creationTimestamp?: Date,
    public modificationTimestamp?: Date
  ) {}

  /**
   * Checks if this ObjectBoundary is equal to another object.
   * @param {ObjectBoundary} other - The object to compare with.
   * @returns {boolean} True if the objects are equal, false otherwise.
   */
  equals(other: ObjectBoundaryImpl): boolean {
    if (this === other) return true;
    if (other === null || this.constructor !== other.constructor) return false;
    return this.objectId.equals(other.objectId);
  }
}

export { ObjectBoundary };
