interface ILocation {
  latitude: number;
  longitude: number;
  equals?(other: ILocation): boolean;
}

export type { ILocation };

class Location implements ILocation {
  constructor(public latitude: number, public longitude: number) {}
  equals(other: ILocation): boolean {
    if (this === other) return true;
    return (
      this.latitude === other.latitude && this.longitude === other.longitude
    );
  }
}

export default Location;
