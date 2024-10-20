/**
 * Enum representing action types used in Redux for managing state.
 */
enum ReduxActions {
  /**
   * Action type for setting the travel details in the Redux store.
   */
  SET_TRAVEL = "SET_TRAVEL",

  /**
   * Action type for clearing the travel details from the Redux store.
   */
  CLEAR_TRAVEL = "CLEAR_TRAVEL",

  /**
   * Action type for setting the feedback details in the Redux store.
   */
  SET_FEEDBACK = "SET_FEEDBACK",

  /**
   * Action type for clearing the feedback details from the Redux store.
   */
  CLEAR_FEEDBACK = "CLEAR_FEEDBACK",

  /**
   * Action type for toggling the application's theme mode between 'light' and 'dark'.
   */
  TOGGLE_MODE = "TOGGLE_MODE",

  /**
   * Action type for setting the route details in the Redux store.
   */
  SET_ROUTE = "SET_ROUTE",

  /**
   * Action type for clearing the route details from the Redux store.
   */
  CLEAR_ROUTE = "CLEAR_ROUTE",
}

export default ReduxActions;
