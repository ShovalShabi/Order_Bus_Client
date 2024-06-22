interface LocationImpl {
  lat: number;
  lng: number;
  equals(other: LocationImpl): boolean;
}

export type { LocationImpl };

class LocationClass implements LocationImpl {
  constructor(public lat: number, public lng: number) {}
  equals(other: LocationImpl): boolean {
    if (this === other) return true;
    return this.lat === other.lat && this.lng === other.lng;
  }
}

export { LocationClass };
