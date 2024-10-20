import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { State } from "./states/reducer";
import CustomAlert from "./components/CustomAlert";
import PlanRidePage from "./pages/PlanRidePage";
import ChooseRidePage from "./pages/ChooseRidePage";
import AppRoutes from "./utils/AppRoutes";
import FeedbackPage from "./pages/FeedbackPage";

/**
 * The main application component that sets up the routing and theming.
 * It includes:
 * - Routing for different pages using `react-router-dom`.
 * - Theme switching using Redux state.
 * - Global alert component for notifications.
 */
function App() {
  // Retrieve the current theme mode (light or dark) from Redux state
  const mode = useSelector((state: State) => state.mode);

  // Memoize the theme based on the mode to prevent unnecessary re-renders
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* CssBaseline sets consistent baseline CSS styles for Material UI */}
          <CssBaseline />

          {/* CustomAlert component for displaying notifications */}
          <CustomAlert />

          {/* Define routes for the app's pages */}
          <Routes>
            {/* Route for the Plan Ride page */}
            <Route path={AppRoutes.PLAN_RIDE_PAGE} element={<PlanRidePage />} />

            {/* Default route (root) redirects to the Plan Ride page */}
            <Route
              path={AppRoutes.ROOT}
              element={<Navigate to={AppRoutes.PLAN_RIDE_PAGE} />}
            />

            {/* Route for the Choose Ride page */}
            <Route
              path={AppRoutes.CHOOSE_RIDE_PAGE}
              element={<ChooseRidePage />}
            />

            {/* Route for the Feedback page */}
            <Route
              path={AppRoutes.FILL_RIDE_EXPERIENCE}
              element={<FeedbackPage />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
