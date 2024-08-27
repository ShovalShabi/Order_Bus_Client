import RouteRequestBoundary from "./routeRequestBoundary";

/**
 * Class representing a boundary for an order bus request.
 * This class encapsulates the order bus status and the associated route request.
 */
class OrderBusRequestBoundary {
  private orderBus: boolean;
  private routeRequest: RouteRequestBoundary;

  /**
   * Creates an instance of OrderBusRequestBoundary.
   * @param orderBus - A flag for indication of ordering bus.
   * @param routeRequest - The details of the order bus request.
   */
  constructor(orderBus: boolean, routeRequest: RouteRequestBoundary) {
    this.orderBus = orderBus; // Initialize orderBus to false by default
    this.routeRequest = routeRequest; // Initialize routeRequest as null until it's set
  }

  /**
   * Gets the order bus status.
   * @returns The order bus status as a boolean.
   */
  getOrderBus(): boolean {
    return this.orderBus;
  }

  /**
   * Sets the order bus status.
   * @param orderBus - The new order bus status.
   */
  setOrderBus(orderBus: boolean): void {
    this.orderBus = orderBus;
  }

  /**
   * Gets the associated RouteRequestBoundary.
   * @returns The RouteRequestBoundary object.
   */
  getRouteRequest(): RouteRequestBoundary {
    return this.routeRequest;
  }

  /**
   * Sets the associated RouteRequestBoundary.
   * @param routeRequest - The RouteRequestBoundary object to associate with this order.
   */
  setRouteRequest(routeRequest: RouteRequestBoundary): void {
    this.routeRequest = routeRequest;
  }
}

export default OrderBusRequestBoundary;
