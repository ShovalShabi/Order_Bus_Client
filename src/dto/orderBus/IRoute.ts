/**
 * Interface representing the parameters for a route request boundary.
 * This interface defines the necessary attributes for handling a route request
 * such as the origin, destination, and optional departure and arrival times.
 */
interface IRoute {
  /**
   * The starting point or origin of the route.
   * Represented as a string (could be an address or a geographic coordinate).
   */
  origin: string;

  /**
   * The endpoint or destination of the route.
   * Represented as a string (could be an address or a geographic coordinate).
   */
  destination: string;

  /**
   * Optional departure time for the route.
   * Represented as a string or null if not specified.
   */
  departureTime: string | null;

  /**
   * Optional arrival time for the route.
   * Represented as a string or null if not specified.
   */
  arrivalTime: string | null;
}

export type { IRoute };
