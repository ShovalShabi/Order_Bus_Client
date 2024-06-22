interface CommandIdBoundaryImpl {
  platform: string;
  internalCommandId: string;
  equals(other: CommandIdBoundaryImpl): boolean;
}
export type { CommandIdBoundaryImpl };

class CommandIdBoundary implements CommandIdBoundaryImpl {
  constructor(public platform: string, public internalCommandId: string) {}

  equals(other: CommandIdBoundaryImpl): boolean {
    if (this === other) return true;
    if (other === null || this.constructor !== other.constructor) return false;
    return this.internalCommandId === other.internalCommandId;
  }
}

export default CommandIdBoundary;
