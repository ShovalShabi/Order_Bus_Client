import { createAction, createReducer } from "@reduxjs/toolkit";
import ReduxActions from "../utils/ReduxActions";
import Feedback from "../dto/feedback/Feedback";
import { IRoute } from "../dto/orderBus/IRoute";
import { ILocation } from "../utils/Location";

/**
 * Interface representing the shape of the Redux state.
 */
interface State {
  /**
   * The current theme mode, either 'light' or 'dark'.
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
 * Interface representing the shape of custom step parameter within leg.
 */
export interface CustomStep {
  travel_mode: string;
  start_location: ILocation;
  end_location: ILocation;
  instructions: string;
  distance: string;
  duration: string;
  agencyName: string;
  lineNumber?: string;
}

/**
 * Interface representing the shape of the Redux route parameter.
 */
interface SerializableRoute {
  summary: string;
  legs: Array<{
    start_address: string;
    start_coord: ILocation;
    end_address: string;
    end_coord: ILocation;
    distance: string;
    duration: string;
    steps: Array<CustomStep>;
  }>;
}

export type { SerializableRoute };

/**
 * The initial state of the reducer.
 */
const initialState: State = {
  mode: "light",
  lastTravel: null,
  lastFeedback: null,
  route: null,
};

// Define actions

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
 * Action to set the details of the latest route option.
 */
const setRoute = createAction<SerializableRoute>(ReduxActions.SET_ROUTE);

/**
 * Action to clear the details of the latest route option.
 */
const clearRoute = createAction<void>(ReduxActions.CLEAR_ROUTE);

/**
 * The reducer function that handles the state changes based on the actions.
 * @param initialState The initial state of the reducer.
 */
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTravel, (state, action) => {
      // Set the details of the latest travel option.
      state.lastTravel = action.payload;
    })
    .addCase(clearTravel, (state) => {
      // Clear the details of the latest travel option.
      state.lastTravel = null;
    })
    .addCase(setFeedback, (state, action) => {
      // Set the feedback provided by the user.
      state.lastFeedback = action.payload;
    })
    .addCase(clearFeedback, (state) => {
      // Clear the feedback provided by the user.
      state.lastFeedback = null;
    })
    .addCase(toggleMode, (state) => {
      // Toggle the theme mode between 'light' and 'dark'.
      state.mode = state.mode === "light" ? "dark" : "light";
    })
    .addCase(setRoute, (state, action) => {
      // Set the details of the latest route that has been selected by the user.
      state.route = action.payload;
    })
    .addCase(clearRoute, (state) => {
      // Clear the details of the latest route that has been selected by the user.
      state.route = null;
    });
});

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
