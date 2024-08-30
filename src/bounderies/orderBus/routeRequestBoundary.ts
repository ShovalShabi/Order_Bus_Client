/**
 * Class representing a boundary for a route request.
 * This class encapsulates the origin and destination addresses, as well as the departure and arrival times.
 */
class RouteRequestBoundary {
  private originAddress: string;
  private destinationAddress: string;
  private departureTime: Date | null;
  private arrivalTime: Date | null;

  /**
   * Creates an instance of RouteRequestBoundary.
   * @param originAddress - The starting point of the route.
   * @param destinationAddress - The endpoint of the route.
   * @param departureTime - The departure time from the origin.
   * @param arrivalTime - The arrival time at the destination.
   */
  constructor(
    originAddress: string,
    destinationAddress: string,
    departureTime: Date | null,
    arrivalTime: Date | null
  ) {
    this.originAddress = originAddress;
    this.destinationAddress = destinationAddress;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
  }

  /**
   * Gets the origin address.
   * @returns The origin address as a string.
   */
  getOriginAddress(): string {
    return this.originAddress;
  }

  /**
   * Sets the origin address.
   * @param originAddress - The new origin address.
   */
  setOriginAddress(originAddress: string): void {
    this.originAddress = originAddress;
  }

  /**
   * Gets the destination address.
   * @returns The destination address as a string.
   */
  getDestinationAddress(): string {
    return this.destinationAddress;
  }

  /**
   * Sets the destination address.
   * @param destinationAddress - The new destination address.
   */
  setDestinationAddress(destinationAddress: string): void {
    this.destinationAddress = destinationAddress;
  }

  /**
   * Gets the origin departure time.
   * @returns The departure time from the origin as a Date object.
   */
  getDepartureTime(): Date | null {
    return this.departureTime;
  }

  /**
   * Sets the origin departure time.
   * @param departureTime - The new departure time from the origin.
   */
  setDepartureTime(departureTime: Date): void {
    this.departureTime = departureTime;
  }

  /**
   * Gets the destination arrival time.
   * @returns The arrival time at the destination as a Date object.
   */
  getArrivalTime(): Date | null {
    return this.arrivalTime;
  }

  /**
   * Sets the destination arrival time.
   * @param arrivalTime - The new arrival time at the destination.
   */
  setArrivalTime(arrivalTime: Date): void {
    this.arrivalTime = arrivalTime;
  }
}

export default RouteRequestBoundary;
