/**
 * Enum representing the routes in the application.
 * These routes correspond to the different pages in the application.
 */
enum AppRoutes {
  /**
   * Route for the page where users can plan their ride.
   * The path is "/plan-your-ride".
   */
  PLAN_RIDE_PAGE = "/plan-your-ride",

  /**
   * Route for the page where users can choose a ride option.
   * The path is "/choose-ride-option".
   */
  CHOOSE_RIDE_PAGE = "/choose-ride-option",

  /**
   * Route for the page where users can fill out their ride experience.
   * The path is "/ride-experience".
   */
  FILL_RIDE_EXPERIENCE = "/ride-experience",

  /**
   * The root route of the application, usually the landing or home page.
   * The path is "/".
   */
  ROOT = "/",
}

export default AppRoutes;
