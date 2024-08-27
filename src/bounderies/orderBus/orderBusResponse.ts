import RouteFlow from "./routeFlow";

/**
 * Class representing a route request, including origin, destination, and route flow details.
 */
class OrderBusResponse {
  origin: string;
  destination: string;
  initialDepartureTime: string;
  finalArrivalTime: string;
  publishedTimestamp: string;
  routeFlow: RouteFlow;

  /**
   * Creates an instance of OrderBusResponse.
   * @param origin - The origin address of the route.
   * @param destination - The destination address of the route.
   * @param initialDepartureTime - The initial departure time from the origin.
   * @param finalArrivalTime - The final arrival time at the destination.
   * @param publishedTimestamp - The timestamp when the route request was published.
   * @param routeFlow - The flow of the route including transit details and polyline.
   */
  constructor(
    origin: string,
    destination: string,
    initialDepartureTime: string,
    finalArrivalTime: string,
    publishedTimestamp: string,
    routeFlow: RouteFlow
  ) {
    this.origin = origin;
    this.destination = destination;
    this.initialDepartureTime = initialDepartureTime;
    this.finalArrivalTime = finalArrivalTime;
    this.publishedTimestamp = publishedTimestamp;
    this.routeFlow = routeFlow;
  }
}

export default OrderBusResponse;
