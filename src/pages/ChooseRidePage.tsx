import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomMap from "../components/CustomMap";
import { SerializableRoute, State } from "../states/reducer";
import AppRoutes from "../utils/AppRoutes";
import passengerWebSocketService from "../services/passengerWebSocketService";
import { ILocation } from "../utils/Location";
import { IRoute } from "../dto/orderBus/IRoute";

export default function ChooseRidePage() {
  const navigate = useNavigate();
  const theme = useTheme(); // Get theme from Material-UI
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Media query for screen size

  const routeData: SerializableRoute | null = useSelector(
    (state: State) => state.route
  );

  const travelData: IRoute | null = useSelector(
    (state: State) => state.lastTravel
  );

  const [isBusOnTheWay, setIsBusOnTheWay] = useState(false);

  useEffect(() => {
    if (!travelData) {
      passengerWebSocketService.disconnect();
      navigate(AppRoutes.PLAN_RIDE_PAGE);
      return;
    }

    // Connect to WebSocket when the component mounts
    passengerWebSocketService.connect();

    // Handle bus accepted event
    passengerWebSocketService.onBusAccepted = () => {
      console.log("Bus is on the way to the passenger!");
      setIsBusOnTheWay(true);
    };

    // Handle ride canceled event
    passengerWebSocketService.onRideCanceled = () => {
      console.log("Ride has been canceled");
      setIsBusOnTheWay(false);
    };

    // Start the ping mechanism with routeData
    if (routeData) {
      passengerWebSocketService.startPing(routeData);
    }

    // Clean up the WebSocket connection only on navigation
    return () => {
      if (location.pathname !== AppRoutes.CHOOSE_RIDE_PAGE) {
        console.log("Navigation occurred, disconnecting WebSocket");
        passengerWebSocketService.disconnect();
      }
    };
  }, [travelData, routeData, navigate]);

  const handleGoBack = () => {
    handleCancelRide();
    navigate(AppRoutes.PLAN_RIDE_PAGE);
  };

  const handleOrderBus = () => {
    if (routeData) {
      passengerWebSocketService.orderBus(
        routeData.legs[0].start_coord as ILocation,
        routeData.legs[0].end_coord as ILocation
      );
      console.log(
        "Bus ordered for ride from:",
        travelData?.origin,
        "to:",
        travelData?.destination
      );
    }
  };

  const handleCancelRide = () => {
    if (routeData) {
      passengerWebSocketService.cancelBus(
        routeData.legs[0].start_coord as ILocation,
        routeData.legs[0].end_coord as ILocation
      );
      console.log(
        "Ride canceled from:",
        travelData?.origin,
        "to:",
        travelData?.destination
      );
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="rgba(0, 0, 0, 0.1)" // Light background for the page
    >
      <Box
        width={isNonMobileScreens ? "85%" : "95%"} // Set the width to maintain layout
        height="auto" // Adjust height to content
        p="2rem"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.paper} // Card-like background
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" // Light shadow for the card
      >
        <Container
          maxWidth="xl"
          sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            color={theme.palette.primary.main}
            mb="2rem"
            textAlign="center"
          >
            Choose Your Ride
          </Typography>

          <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
            <Box sx={{ flex: 1, height: "60vh" }}>
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              backgroundColor: theme.palette.primary.light, // Keep the background consistent with the theme
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGoBack}
              sx={{ mx: 2 }}
              fullWidth={isNonMobileScreens ? false : true} // Full-width on mobile screens
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOrderBus}
              sx={{ mx: 2 }}
              fullWidth={isNonMobileScreens ? false : true} // Full-width on mobile screens
            >
              Order Bus
            </Button>
            {isBusOnTheWay && (
              <Button
                variant="contained"
                color="error"
                onClick={handleCancelRide}
                sx={{ mx: 2 }}
                fullWidth={isNonMobileScreens ? false : true} // Full-width on mobile screens
              >
                Cancel Ride
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
