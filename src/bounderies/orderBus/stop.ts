import LatLng from "./latLng";

/**
 * Class representing a stop with a name and location.
 */
class Stop {
  name: string;
  location: LatLng;

  /**
   * Creates an instance of Stop.
   * @param name - The name of the stop.
   * @param location - The geographic location of the stop.
   */
  constructor(name: string, location: LatLng) {
    this.name = name;
    this.location = location;
  }
}

export default Stop;
