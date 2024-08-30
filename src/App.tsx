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

function App() {
  const mode = useSelector((state: State) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CustomAlert />
          <Routes>
            <Route path={AppRoutes.PLAN_RIDE_PAGE} element={<PlanRidePage />} />
            <Route
              path={AppRoutes.ROOT}
              element={<Navigate to={AppRoutes.PLAN_RIDE_PAGE} />}
            />
            <Route
              path={AppRoutes.CHOOSE_RIDE_PAGE}
              element={<ChooseRidePage />}
            />
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
