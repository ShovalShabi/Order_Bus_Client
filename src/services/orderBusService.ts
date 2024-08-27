import axios, { AxiosInstance } from "axios";
import OrderBusRequestBoundary from "../bounderies/orderBus/orderBusRequest";
import OrderBusResponse from "../bounderies/orderBus/orderBusResponse";
import getEnvVariables from "../etc/loadVariables";
import { IOrderBusService } from "./IOrderBusService";

/**
 * Service class for interacting with the Route API.
 */
class RouteService implements IOrderBusService {
  private axiosInstance: AxiosInstance;
  private readonly baseUrl: string;

  /**
   * Creates an instance of RouteService.
   * @param axiosInstance - An optional Axios instance to be used for requests.
   */
  constructor(axiosInstance?: AxiosInstance) {
    // Load environment variables from .env files
    const envVariables = getEnvVariables();
    const { backendURL } = envVariables;

    // Define base URLs for different API endpoints related to commands
    const orderBusBaseUrl = backendURL + "/orderbus";
    this.axiosInstance = axiosInstance || axios.create();
    this.baseUrl = orderBusBaseUrl;
  }

  /**
   * Creates a route request and retrieves the route details.
   * @param request - The order bus request boundary object.
   * @returns A promise that resolves to the order bus response.
   */
  async createRouteRequest(
    request: OrderBusRequestBoundary
  ): Promise<OrderBusResponse[]> {
    try {
      const response = await this.axiosInstance.post<OrderBusResponse[]>(
        `${this.baseUrl}/stops`,
        request
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create route request: ${error}`);
    }
  }
}

export default RouteService;
