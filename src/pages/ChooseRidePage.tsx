/**
 * ChooseRidePage component allows users to view and select a ride, interact with WebSocket services,
 * and manage the process of ordering or canceling a bus ride. It also provides feedback via the
 * useAlert hook and displays success/failure notifications.
 *
 * @component
 * @returns {JSX.Element} Rendered component for choosing a ride.
 *
 * @example
 * <ChooseRidePage />
 */

// React, Redux, Material-UI, and service imports
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
import useAlert from "../hooks/useAlert";
import extractFirstStepAsTransit from "../utils/extractFirstStepAsTransit";

/**
 * ChooseRidePage React component
 * Handles WebSocket connection to order or cancel a bus ride and manages UI states such as loading
 * indicators and success/error icons. It also displays the map with relevant ride information.
 *
 * @returns {JSX.Element} The rendered JSX element for the ChooseRidePage component.
 */
export default function ChooseRidePage() {
  // Navigation for handling page transitions
  const navigate = useNavigate();
  const theme = useTheme(); // Get the theme
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Media query for screen size
  const { setAlert } = useAlert(); // Custom hook for displaying alerts

  // Fetch selected route and travel data from Redux store
  const routeData: SerializableRoute | null = useSelector(
    (state: State) => state.route
  );

  const travelData: IRoute | null = useSelector(
    (state: State) => state.lastTravel
  );

  // Component state hooks for handling bus status, loading states, and icons
  const [isBusOnTheWay, setIsBusOnTheWay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState<"success" | "error" | null>(null); // Show success/error icons
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined); // Timer for handling timeouts

  // Effect to set the document title on page load
  useEffect(() => {
    document.title = "Choose Your Ride";
  }, []);

  // WebSocket and event handling effect
  useEffect(() => {
    if (!travelData) {
      passengerWebSocketService.disconnect();
      navigate(AppRoutes.PLAN_RIDE_PAGE);
      return;
    }

    // Establish WebSocket connection
    passengerWebSocketService.connect();

    // Event: Bus accepted by a driver
    passengerWebSocketService.onBusAccepted = (payload: string) => {
      setIsBusOnTheWay(true);
      setLoading(false);
      setShowIcon("success"); // Show success icon
      setAlert({
        message: payload,
        severity: "success",
      });

      // Hide success icon after 2 seconds
      setTimeout(() => setShowIcon(null), 2000);
      clearTimeout(timer.current);
    };

    // Event: Ride canceled by driver
    passengerWebSocketService.onRideCanceled = () => {
      setIsBusOnTheWay(false);
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

    // Start ping mechanism with route data
    if (routeData) {
      passengerWebSocketService.startPing(routeData);
    }

    // Clean up WebSocket connection on navigation
    return () => {
      if (location.pathname !== AppRoutes.CHOOSE_RIDE_PAGE) {
        console.log("Navigation occurred, disconnecting WebSocket");
        passengerWebSocketService.disconnect();
      }
    };
  }, [travelData, routeData, navigate, setAlert]);

  /**
   * Handles ordering a bus by sending a WebSocket message. Displays a loading state and waits for a driver response.
   */
  const handleOrderBus = () => {
    if (routeData) {
      setShowIcon(null); // Reset icons
      setLoading(true);

      // Extract the first transit step from the route data
      const step = extractFirstStepAsTransit(routeData);

      // Send bus order via WebSocket
      passengerWebSocketService.orderBus(
        step?.start_location as ILocation,
        step?.end_location as ILocation
      );

      setAlert({
        message: "Bus order placed, waiting for drivers to respond...",
        severity: "info",
      });

      // Set a timer for 1 minute to simulate waiting for a response
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
                  Share with us your ride experience.
                </Link>
              </span>
            ),
            severity: "error",
          });

          // Hide error icon after 2 seconds
          setTimeout(() => setShowIcon(null), 2000);
        }
      }, 60000); // 1 minute
    }
  };

  /**
   * Handles the "Go Back" button click, navigates to the ride planning page.
   */
  const handleGoBack = () => {
    if (loading) handleCancelRide();
    navigate(AppRoutes.PLAN_RIDE_PAGE);
  };

  /**
   * Cancels the bus ride if ordered and updates the state accordingly.
   */
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
        width={isNonMobileScreens ? "85%" : "95%"} // Set width according to screen size
        height="auto"
        p="2rem"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.paper}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
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
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              backgroundColor: theme.palette.primary.light,
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGoBack}
              sx={{ flex: 1, mx: 1 }}
              fullWidth={isNonMobileScreens ? false : true}
            >
              Go Back
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleOrderBus}
              /**
               * Disabled only in those cases:
               * 1) When a bus is being ordered and the user still accepting for pickup
               * 2) The is no route seleted yet.
               * 3) The bus is on it's way.
               */
              disabled={
                loading || showIcon !== null || !routeData || isBusOnTheWay
              }
              fullWidth
              sx={{ flex: 1, position: "relative", mx: 1 }}
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

            {isBusOnTheWay && (
              <Fade in={isBusOnTheWay}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCancelRide}
                  sx={{ flex: 1, mx: 1 }}
                  fullWidth={isNonMobileScreens ? false : true}
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
