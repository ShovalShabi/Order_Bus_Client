import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import CustomMap from "../components/CustomMap";
import { State } from "../states/reducer";
import AppRoutes from "../utils/AppRoutes";
import passengerWebSocketService from "../services/passengerWebSocketService";
import { ILocation } from "../utils/Location";

export default function ChooseRidePage() {
  const navigate = useNavigate();
  const { travelData, routeData } = useSelector((state: State) => ({
    travelData: state.lastTravel,
    routeData: state.route,
  }));
  const [isBusOnTheWay, setIsBusOnTheWay] = useState(false);

  useEffect(() => {
    if (!travelData) {
      navigate(AppRoutes.PLAN_RIDE_PAGE);
      passengerWebSocketService.disconnect();
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

    // Clean up on unmount
    return () => {
      console.log("disconnected from server");
      passengerWebSocketService.disconnect();
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
          onClick={handleGoBack}
          sx={{ mx: 2 }}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOrderBus}
          sx={{ mx: 2 }}
        >
          Order Bus
        </Button>
        {isBusOnTheWay && (
          <Button
            variant="contained"
            color="error"
            onClick={handleCancelRide}
            sx={{ mx: 2 }}
          >
            Cancel Ride
          </Button>
        )}
      </Box>
    </Container>
  );
}
