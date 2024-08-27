import Location from "../../utils/Location";
import TransitDetail from "./transitDetail";

/**
 * Class representing the flow of a route, including transit details and a polyline.
 */
class RouteFlow {
  transitDetails: TransitDetail[];
  polyline: Location[];

  /**
   * Creates an instance of RouteFlow.
   * @param transitDetails - An array of TransitDetail objects representing the segments of the route.
   * @param polyline - An array of LatLng objects representing the polyline of the route.
   */
  constructor(transitDetails: TransitDetail[], polyline: Location[]) {
    this.transitDetails = transitDetails;
    this.polyline = polyline;
  }
}

export default RouteFlow;
