import { UserIdBoundaryImpl } from "../../bounderies/user/UserIdBoundary";

interface UserIdInvokerImpl {
  userId: UserIdBoundaryImpl;
  equals(other: UserIdInvokerImpl): boolean;
}

export type { UserIdInvokerImpl };

class UserIdInvoker implements UserIdInvokerImpl {
  constructor(public userId: UserIdBoundaryImpl) {}

  equals(other: UserIdInvokerImpl): boolean {
    if (this === other) return true;
    return this.userId.equals(other.userId);
  }
}

export { UserIdInvoker };
