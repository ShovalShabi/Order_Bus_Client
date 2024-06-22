interface ObjectIdBoundaryImpl {
  platform: string;
  internalObjectId: string;
  equals(other: ObjectIdBoundaryImpl): boolean;
}

class ObjectIdBoundary implements ObjectIdBoundaryImpl {
  constructor(public platform: string, public internalObjectId: string) {}

  equals(other: ObjectIdBoundaryImpl): boolean {
    if (this === other) return true;
    return this.internalObjectId === other.internalObjectId;
  }
}

export { ObjectIdBoundary };
export type { ObjectIdBoundaryImpl };
