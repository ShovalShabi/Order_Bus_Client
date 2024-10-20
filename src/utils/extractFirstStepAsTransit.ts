import { SerializableRoute, CustomStep } from "../states/reducer";

/**
 * Extracts the first step of the route that has a travel mode of "TRANSIT".
 *
 * @param {SerializableRoute} route - The route object containing legs and steps.
 * @returns {CustomStep | null} - Returns the first step with the "TRANSIT" travel mode, or null if no such step is found.
 */
const extractFirstStepAsTransit = (
  route: SerializableRoute
): CustomStep | null => {
  // Find the first step where the travel mode is "TRANSIT".
  const transitStep = route.legs[0].steps.find(
    (step: CustomStep) => step.travel_mode === "TRANSIT"
  );

  // Return the transit step, or null if not found.
  return transitStep || null;
};

export default extractFirstStepAsTransit;
