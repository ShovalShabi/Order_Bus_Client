/**
 * Class representing a boundary for a route request.
 * This class encapsulates the origin and destination addresses, as well as the departure and arrival times.
 */
class RouteRequestBoundary {
  private originAddress: string;
  private destinationAddress: string;
  private originDepartureTime: Date | null;
  private destinationArrivalTime: Date | null;

  /**
   * Creates an instance of RouteRequestBoundary.
   * @param originAddress - The starting point of the route.
   * @param destinationAddress - The endpoint of the route.
   * @param originDepartureTime - The departure time from the origin.
   * @param destinationArrivalTime - The arrival time at the destination.
   */
  constructor(
    originAddress: string,
    destinationAddress: string,
    originDepartureTime: Date,
    destinationArrivalTime: Date
  ) {
    this.originAddress = originAddress;
    this.destinationAddress = destinationAddress;
    this.originDepartureTime = originDepartureTime;
    this.destinationArrivalTime = destinationArrivalTime;
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
  getOriginDepartureTime(): Date | null {
    return this.originDepartureTime;
  }

  /**
   * Sets the origin departure time.
   * @param originDepartureTime - The new departure time from the origin.
   */
  setOriginDepartureTime(originDepartureTime: Date): void {
    this.originDepartureTime = originDepartureTime;
  }

  /**
   * Gets the destination arrival time.
   * @returns The arrival time at the destination as a Date object.
   */
  getDestinationArrivalTime(): Date | null {
    return this.destinationArrivalTime;
  }

  /**
   * Sets the destination arrival time.
   * @param destinationArrivalTime - The new arrival time at the destination.
   */
  setDestinationArrivalTime(destinationArrivalTime: Date): void {
    this.destinationArrivalTime = destinationArrivalTime;
  }
}

export default RouteRequestBoundary;
