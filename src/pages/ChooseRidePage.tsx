import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import CustomMap from "../components/CustomMap";
import { State } from "../states/reducer";
import AppRoutes from "../utils/AppRoutes";

export default function ChooseRidePage() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const travelData = useSelector((state: State) => state.lastTravel);

  useEffect(() => {
    if (!travelData) {
      navigate(AppRoutes.PLAN_RIDE_PAGE);
      return;
    }
  }, [travelData, navigate]);

  return (
    <Container
      maxWidth="xl"
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Typography variant="h4" sx={{ my: 2 }}>
        Choose Your Ride
      </Typography>

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Box sx={{ flex: 1 }}>
          {travelData && (
            <CustomMap
              origin={travelData.origin}
              destination={travelData.destination}
              departureTime={travelData.departureTime}
              arrivalTime={travelData.arrivalTime}
            />
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Bottom Pane: Centered Go Back and Order Bus buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          backgroundColor: "#3FA2F6",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(AppRoutes.PLAN_RIDE_PAGE)}
          sx={{ mx: 2 }}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Order Bus clicked")}
          sx={{ mx: 2 }}
        >
          Order Bus
        </Button>
      </Box>
    </Container>
  );
}
