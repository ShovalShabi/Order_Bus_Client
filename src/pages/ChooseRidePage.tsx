import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  CircularProgress,
  Fade,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";
import { green } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CustomMap from "../components/CustomMap";
import { SerializableRoute, State } from "../states/reducer";
import AppRoutes from "../utils/AppRoutes";
import passengerWebSocketService from "../services/passengerWebSocketService";
import { ILocation } from "../utils/Location";
import { IRoute } from "../dto/orderBus/IRoute";
import useAlert from "../hooks/useAlert"; // Importing the alert hook
import extractFirstStepAsTransit from "../utils/extractFirstStepAsTransit";

export default function ChooseRidePage() {
  const navigate = useNavigate();
  const theme = useTheme(); // Get theme from Material-UI
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Media query for screen size
  const { setAlert } = useAlert(); // Using custom alert hook

  const routeData: SerializableRoute | null = useSelector(
    (state: State) => state.route
  );

  const travelData: IRoute | null = useSelector(
    (state: State) => state.lastTravel
  );

  const [isBusOnTheWay, setIsBusOnTheWay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState<"success" | "error" | null>(null); // Control icon visibility
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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
      setIsBusOnTheWay(true);
      setLoading(false);
      setShowIcon("success"); // Show success icon
      setAlert({
        message: "Bus is on the way to the passenger!",
        severity: "success",
      });

      // Fade away success icon after 2 seconds
      setTimeout(() => setShowIcon(null), 2000);
    };

    // Handle ride canceled event
    passengerWebSocketService.onRideCanceled = () => {
      setIsBusOnTheWay(false);
      // Set alert with a hyperlink for feedback
      setAlert({
        message: (
          <span>
            Ride has been canceled by the driver.{" "}
            <Link
              component="button"
              variant="body2"
              color="inherit"
              underline="always"
              onClick={() => navigate(AppRoutes.FILL_RIDE_EXPERIENCE)}
            >
              Fill out report on company's bus line.
            </Link>
          </span>
        ),
        severity: "warning",
      });
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
  }, [travelData, routeData, navigate, setAlert]);

  const handleOrderBus = () => {
    if (routeData) {
      setShowIcon(null); // Reset icon
      setLoading(true);

      const step = extractFirstStepAsTransit(routeData); // the first step that involves tranist transportation

      // Send the order bus request
      passengerWebSocketService.orderBus(
        step?.start_location as ILocation,
        step?.end_location as ILocation
      );

      setAlert({
        message: "Bus order placed, waiting for drivers to respond...",
        severity: "info",
      });

      // Start a timer for 1 minute to simulate the waiting time
      timer.current = setTimeout(() => {
        setLoading(false);
        if (!isBusOnTheWay) {
          setShowIcon("error"); // Indicate failure
          setAlert({
            message: (
              <span>
                No drivers responded. Please try again later.{"\n"}
                <Link
                  component="button"
                  variant="body2"
                  color="inherit"
                  underline="always"
                  onClick={() => navigate(AppRoutes.FILL_RIDE_EXPERIENCE)}
                >
                  Share with us your ride experince.
                </Link>
              </span>
            ),
            severity: "error",
          });

          // Fade away error icon after 2 seconds
          setTimeout(() => setShowIcon(null), 2000);
        }
      }, 60000); // 1 minute
    }
  };

  const handleGoBack = () => {
    if (loading) handleCancelRide();
    navigate(AppRoutes.PLAN_RIDE_PAGE);
  };

  const handleCancelRide = () => {
    if (routeData) {
      passengerWebSocketService.cancelBus(
        routeData.legs[0].start_coord as ILocation,
        routeData.legs[0].end_coord as ILocation
      );
      setAlert({
        message: "Ride canceled successfully.",
        severity: "info",
      });
      setIsBusOnTheWay(false);
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
              justifyContent: "space-between", // Spread buttons evenly
              alignItems: "center",
              p: 2,
              backgroundColor: theme.palette.primary.light, // Consistent background color
              gap: 2, // Space between buttons
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGoBack}
              sx={{ flex: 1, mx: 1 }} // Equal space for "Go Back" button
              fullWidth={isNonMobileScreens ? false : true} // Full-width on mobile screens
            >
              Go Back
            </Button>

            {/* Order Bus Button with Circular Progress and Icon */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleOrderBus}
              disabled={loading || showIcon !== null} // Disable when loading or icon is shown
              fullWidth
              sx={{ flex: 1, position: "relative", mx: 1 }} // Ensure full width and relative positioning for the icon/progress
            >
              {loading ? "Ordering..." : "Order Bus"}

              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}

              <Fade in={showIcon === "success"}>
                <CheckCircleIcon
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              </Fade>

              <Fade in={showIcon === "error"}>
                <ErrorIcon
                  sx={{
                    color: theme.palette.error.main,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              </Fade>
            </Button>

            {/* Cancel Ride Button (Only shown when the bus is on the way) */}
            {isBusOnTheWay && (
              <Fade in={isBusOnTheWay}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancelRide}
                  sx={{ flex: 1, mx: 1 }} // Equal space for "Cancel Ride" button
                  fullWidth={isNonMobileScreens ? false : true} // Full-width on mobile screens
                >
                  Cancel Ride
                </Button>
              </Fade>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
