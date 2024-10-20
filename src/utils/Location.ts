/**
 * Interface representing a geographic location.
 */
interface ILocation {
  latitude: number; // The latitude of the location
  longitude: number; // The longitude of the location
  /**
   * Optional method to check if this location is equal to another location.
   * @param {ILocation} other - The location to compare with.
   * @returns {boolean} - True if the locations are equal, false otherwise.
   */
  equals?(other: ILocation): boolean;
}

export type { ILocation };

/**
 * Class that implements the ILocation interface and provides utility methods.
 */
class Location implements ILocation {
  constructor(
    public latitude: number, // Latitude of the location
    public longitude: number // Longitude of the location
  ) {}

  /**
   * Compares this location with another location.
   * @param {ILocation} other - The location to compare with.
   * @returns {boolean} - Returns true if the latitude and longitude of both locations are the same, false otherwise.
   */
  equals(other: ILocation): boolean {
    // Return true if both locations refer to the same object
    if (this === other) return true;

    // Return true if both latitude and longitude are equal
    return (
      this.latitude === other.latitude && this.longitude === other.longitude
    );
  }
}

export default Location;
