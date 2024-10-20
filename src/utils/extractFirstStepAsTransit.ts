import { SerializableRoute, CustomStep } from "../states/reducer";

const extractFirstStepAsTransit = (
  route: SerializableRoute
): CustomStep | null => {
  const transitStep = route.legs[0].steps.find(
    (step: CustomStep) => step.travel_mode === "TRANSIT"
  );

  return transitStep || null;
};

export default extractFirstStepAsTransit;
