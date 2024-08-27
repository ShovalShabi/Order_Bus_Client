import Location from "../../utils/Location";

/**
 * Class representing geographic coordinates.
 */
class LatLng {
  latLng: Location;

  /**
   * Creates an instance of LatLng.
   * @param latLng - A location object representing coordinates.
   */
  constructor(latLng: Location) {
    this.latLng = latLng;
  }
}

export default LatLng;
