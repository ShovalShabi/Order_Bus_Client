import { CommandIdBoundaryImpl } from "./CommandIdBoundary";
import { ObjectIdInvokerImpl } from "../../utils/invokers/ObjectIdInvoker";
import { UserIdInvokerImpl } from "../../utils/invokers/UserIdInvoker";

interface CommandBoundaryImpl {
  commandId: CommandIdBoundaryImpl;
  command: string;
  targetObject: ObjectIdInvokerImpl;
  invocationTimestamp?: Date;
  invokedBy: UserIdInvokerImpl;
  commandAttributes: Record<
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
  equals(other: CommandBoundaryImpl): boolean;
}

class CommandBoundary implements CommandBoundaryImpl {
  constructor(
    public commandId: CommandIdBoundaryImpl,
    public command: string,
    public targetObject: ObjectIdInvokerImpl,
    public invokedBy: UserIdInvokerImpl,
    public commandAttributes: Record<
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
    public invocationTimestamp?: Date
  ) {}

  equals(other: CommandBoundaryImpl): boolean {
    if (this === other) return true;
    if (other === null || this.constructor !== other.constructor) return false;
    return this.commandId.equals(other.commandId);
  }
}

export { CommandBoundary };
export type { CommandBoundaryImpl };
