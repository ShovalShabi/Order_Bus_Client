import { SerializableRoute } from "./reducer";

const convertRouteToSerializable = (
  route: google.maps.DirectionsRoute
): SerializableRoute => {
  return {
    summary: route.summary,
    legs: route.legs.map((leg) => ({
      start_address: leg.start_address,
      end_address: leg.end_address,
      distance: leg.distance?.text || "",
      duration: leg.duration?.text || "",
      steps: leg.steps.map((step) => ({
        travel_mode: step.travel_mode,
        instructions: step.instructions || "",
        distance: step.distance?.text || "",
        duration: step.duration?.text || "",
        lineNumber: step.transit?.line?.short_name || "", // Extract the line number if available
        agencyName: step.transit?.line?.agencies?.[0]?.name || "", // Extract the agency name if available
      })),
    })),
  };
};

export default convertRouteToSerializable;
