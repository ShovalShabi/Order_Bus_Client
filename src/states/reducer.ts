import { createAction, createReducer } from "@reduxjs/toolkit";
import ReduxActions from "../utils/ReduxActions";
import Feedback from "../dto/feedback/Feedback";
import { IRoute } from "../dto/orderBus/IRoute";
import { ILocation } from "../utils/Location";

/**
 * Interface representing the structure of the Redux state.
 */
interface State {
  /**
   * The current theme mode, which can either be 'light' or 'dark'.
   */
  mode: "light" | "dark";

  /**
   * The details of the last travel option that the user searched for.
   */
  lastTravel: IRoute | null;

  /**
   * The feedback provided by the user.
   */
  lastFeedback: Feedback | null;

  /**
   * The details of the last route option that the user selected.
   */
  route: SerializableRoute | null;
}

export type { State };

/**
 * Interface representing the structure of a custom step within a leg.
 */
export interface CustomStep {
  /**
   * The mode of travel for the step (e.g., "WALKING", "TRANSIT").
   */
  travel_mode: string;

  /**
   * The start location of the step.
   */
  start_location: ILocation;

  /**
   * The end location of the step.
   */
  end_location: ILocation;

  /**
   * Text instructions for this step (e.g., "Turn left onto Main St").
   */
  instructions: string;

  /**
   * The distance covered by this step.
   */
  distance: string;

  /**
   * The time duration of this step.
   */
  duration: string;

  /**
   * The name of the agency providing transit services for this step.
   */
  agencyName: string;

  /**
   * The line number for the transit step (if applicable).
   */
  lineNumber?: string;
}

/**
 * Interface representing the structure of a route that is stored in Redux state.
 */
interface SerializableRoute {
  /**
   * A summary of the route.
   */
  summary: string;

  /**
   * The legs of the route, which describe the journey in segments.
   */
  legs: Array<{
    /**
     * The start address of this leg.
     */
    start_address: string;

    /**
     * The coordinates of the start location.
     */
    start_coord: ILocation;

    /**
     * The end address of this leg.
     */
    end_address: string;

    /**
     * The coordinates of the end location.
     */
    end_coord: ILocation;

    /**
     * The distance for this leg of the journey.
     */
    distance: string;

    /**
     * The time duration for this leg of the journey.
     */
    duration: string;

    /**
     * The steps within this leg, each representing a distinct instruction or part of the journey.
     */
    steps: Array<CustomStep>;
  }>;
}

export type { SerializableRoute };

/**
 * The initial state of the Redux reducer.
 * The state contains the default values for mode, last travel, feedback, and route.
 */
const initialState: State = {
  mode: "light", // Default mode is 'light'
  lastTravel: null, // No last travel stored initially
  lastFeedback: null, // No feedback stored initially
  route: null, // No route stored initially
};

// Define actions for modifying the state

/**
 * Action to set the details of the latest travel option.
 */
const setTravel = createAction<IRoute>(ReduxActions.SET_TRAVEL);

/**
 * Action to clear the details of the latest travel option.
 */
const clearTravel = createAction<void>(ReduxActions.CLEAR_TRAVEL);

/**
 * Action to set the feedback provided by the user.
 */
const setFeedback = createAction<Feedback>(ReduxActions.SET_FEEDBACK);

/**
 * Action to clear the feedback provided by the user.
 */
const clearFeedback = createAction<void>(ReduxActions.CLEAR_FEEDBACK);

/**
 * Action to toggle the theme mode between 'light' and 'dark'.
 */
const toggleMode = createAction<void>(ReduxActions.TOGGLE_MODE);

/**
 * Action to set the details of the latest route option selected by the user.
 */
const setRoute = createAction<SerializableRoute>(ReduxActions.SET_ROUTE);

/**
 * Action to clear the details of the latest route option selected by the user.
 */
const clearRoute = createAction<void>(ReduxActions.CLEAR_ROUTE);

/**
 * The reducer function handles state changes based on dispatched actions.
 * @param {State} initialState - The initial state for the reducer.
 */
const reducer = createReducer(initialState, (builder) => {
  // Set the details of the latest travel option
  builder.addCase(setTravel, (state, action) => {
    state.lastTravel = action.payload;
  });

  // Clear the details of the latest travel option
  builder.addCase(clearTravel, (state) => {
    state.lastTravel = null;
  });

  // Set the feedback provided by the user
  builder.addCase(setFeedback, (state, action) => {
    state.lastFeedback = action.payload;
  });

  // Clear the feedback provided by the user
  builder.addCase(clearFeedback, (state) => {
    state.lastFeedback = null;
  });

  // Toggle the theme mode between 'light' and 'dark'
  builder.addCase(toggleMode, (state) => {
    state.mode = state.mode === "light" ? "dark" : "light";
  });

  // Set the details of the latest route selected by the user
  builder.addCase(setRoute, (state, action) => {
    state.route = action.payload;
  });

  // Clear the details of the latest route selected by the user
  builder.addCase(clearRoute, (state) => {
    state.route = null;
  });
});

// Export the reducer and actions for use in the application
export default reducer;

export {
  setTravel,
  clearTravel,
  setFeedback,
  clearFeedback,
  toggleMode,
  setRoute,
  clearRoute,
};
