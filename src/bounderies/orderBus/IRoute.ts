/**
 * Interface representing the parameters for a route request boundary.
 */
interface IRoute {
  origin: string;
  destination: string;
  departureTime: string | null;
  arrivalTime: string | null;
}

export type { IRoute };
