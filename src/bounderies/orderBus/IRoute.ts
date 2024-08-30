/**
 * Interface representing the parameters for a route request boundary.
 */
interface IRoute {
  origin: string;
  destination: string;
  departureTime: Date | null;
  arrivalTime: Date | null;
}

export type { IRoute };
