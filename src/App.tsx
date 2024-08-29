import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { State } from "./states/reducer";
import CustomAlert from "./components/CustomAlert";
import CustomMap from "./components/CustomMap";
import PlanRidePage from "./pages/PlanRidePage";
import ChooseRidePage from "./pages/ChooseRidePage";

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
            <Route path="/" element={<Navigate to={"/plan-your-ride"} />} />
            <Route path="/choose-ride-option" element={<ChooseRidePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
