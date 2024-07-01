import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { State } from "./states/reducer";
import CustomAlert from "./components/CustomAlert";
import CustomMap from "./components/CustomMap";
import PlanRidePage from "./pages/PlanRidePage";
import SelectRoutePage from "./pages/SelectRoutePage";
import RouteDetailsPage from "./pages/SelectDetailsPage";

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
            <Route path="/get-route" element={<CustomMap />} />
            <Route path="/plan-your-ride" element={<PlanRidePage />} />
            <Route path="/select-route" element={<SelectRoutePage />} />
            <Route
              path="/select-route/:routeId"
              element={<RouteDetailsPage />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
