import { createAction, createReducer } from "@reduxjs/toolkit";
import ReduxActions from "../utils/ReduxActions";
import RouteRequestBoundary from "../bounderies/orderBus/routeRequestBoundary";
import Feedback from "../bounderies/feedback/Feedback";

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
  lastTravel: RouteRequestBoundary | null;

  /**
   * The feedback provided by the user.
   */
  lastFeedback: Feedback | null;
}

export type { State };

/**
 * The initial state of the reducer.
 */
const initialState: State = {
  mode: "light",
  lastTravel: null,
  lastFeedback: null,
};

// Define actions

/**
 * Action to set the details of the latest travel option.
 */
const setTravel = createAction<RouteRequestBoundary>(ReduxActions.SET_TRAVEL);

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
    });
});

export default reducer;

export { setTravel, clearTravel, setFeedback, clearFeedback, toggleMode };
