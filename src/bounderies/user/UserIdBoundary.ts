interface UserIdBoundaryImpl {
  platform: string;
  email: string;
  equals(other: UserIdBoundaryImpl): boolean;
}

export type { UserIdBoundaryImpl };

class UserIdBoundary implements UserIdBoundaryImpl {
  constructor(public platform: string, public email: string) {}

  equals(other: UserIdBoundaryImpl): boolean {
    if (this === other) return true;
    if (other === null || this.constructor !== other.constructor) return false;
    return this.email === other.email;
  }
}

export { UserIdBoundary };
