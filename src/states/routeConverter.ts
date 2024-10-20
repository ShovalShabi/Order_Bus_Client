import { SerializableRoute } from "./reducer";
import { ILocation } from "../utils/Location";

/**
 * Converts a Google Maps `DirectionsRoute` object to a serializable format
 * that can be stored in the Redux store. This function ensures that the
 * complex structure of the route (including coordinates, distance, and duration)
 * is simplified into a format that is compatible with the application's requirements.
 *
 * @param {google.maps.DirectionsRoute} route - The route provided by the Google Maps API.
 * @returns {SerializableRoute} - The converted serializable route.
 */
const convertRouteToSerializable = (
  route: google.maps.DirectionsRoute
): SerializableRoute => {
  return {
    summary: route.summary, // The summary of the route (e.g., "Main St to Elm St").
    legs: route.legs.map((leg) => ({
      start_address: leg.start_address, // The start address for this leg of the journey.
      start_coord: {
        latitude: leg.start_location.lat(),
        longitude: leg.start_location.lng(),
      } as ILocation, // Convert Google Maps LatLng object to ILocation for start location.
      end_address: leg.end_address, // The end address for this leg of the journey.
      end_coord: {
        latitude: leg.end_location.lat(),
        longitude: leg.end_location.lng(),
      } as ILocation, // Convert Google Maps LatLng object to ILocation for end location.
      distance: leg.distance?.text || "", // The distance for this leg (e.g., "10 km").
      duration: leg.duration?.text || "", // The duration for this leg (e.g., "15 minutes").
      steps: leg.steps.map((step) => ({
        travel_mode: step.travel_mode, // The mode of travel (e.g., "WALKING", "TRANSIT").
        start_location: {
          latitude: step.start_location.lat(),
          longitude: step.start_location.lng(),
        } as ILocation, // Convert start location to ILocation.
        end_location: {
          latitude: step.end_location.lat(),
          longitude: step.end_location.lng(),
        } as ILocation, // Convert end location to ILocation.
        instructions: step.instructions || "", // Text instructions for this step (e.g., "Turn left onto Main St").
        distance: step.distance?.text || "", // Distance for this step.
        duration: step.duration?.text || "", // Duration for this step.
        lineNumber: step.transit?.line?.short_name || "", // Transit line number if applicable.
        agencyName: step.transit?.line?.agencies?.[0]?.name || "", // Agency name for the transit line if applicable.
      })),
    })),
  };
};

export default convertRouteToSerializable;
