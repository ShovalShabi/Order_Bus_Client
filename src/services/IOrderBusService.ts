import OrderBusRequestBoundary from "../bounderies/orderBus/orderBusRequest";
import OrderBusResponse from "../bounderies/orderBus/orderBusResponse";

/**
 * Interface representing the Route API service.
 */
export interface IOrderBusService {
  /**
   * Creates a route request and retrieves the route details.
   * @param request - The order bus request boundary object.
   * @returns A promise that resolves to the order bus response.
   */
  createRouteRequest(
    request: OrderBusRequestBoundary
  ): Promise<OrderBusResponse[]>;
}
