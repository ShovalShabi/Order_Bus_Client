/**
 * PlanRidePage component
 *
 * This component allows users to plan their bus ride by selecting the departure point, destination,
 * and desired departure/arrival times. The user can also auto-fill their current location as the
 * departure point using the "Locate Me" feature.
 *
 * The planned route is then saved in the Redux store, and the user is navigated to the "Choose Ride" page.
 *
 * @component
 * @returns {JSX.Element} The rendered JSX element for the PlanRidePage component.
 *
 * @example
 * <PlanRidePage />
 */

import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Grow,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearRoute, setTravel, State } from "../states/reducer";
import { IRoute } from "../dto/orderBus/IRoute";
import AppRoutes from "../utils/AppRoutes";
import getEnvVariables from "../etc/loadVariables";

/**
 * PlanRidePage component for planning a bus ride.
 * Allows users to input a departure and destination, as well as departure/arrival times.
 * The user can use the "Locate Me" feature to automatically populate the current location as the departure point.
 *
 * @returns {JSX.Element} The rendered PlanRidePage component.
 */
const PlanRidePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { apiGlobalKey } = getEnvVariables(); // Retrieve environment variables

  const theme = useTheme(); // Material-UI theme hook
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Check screen size for responsiveness

  // Fetch previous travel data from Redux store if available
  const travelData = useSelector((state: State) => state.lastTravel);

  // State to manage departure and destination input
  const [departure, setDeparture] = useState<string>(travelData?.origin || "");
  const [destination, setDestination] = useState<string>(
    travelData?.destination || ""
  );

  // State for departure and arrival times, initialized from Redux store or set to empty strings
  const [departureTime, setDepartureTime] = useState<string>(() => {
    if (travelData?.departureTime) {
      return new Date(travelData.departureTime).toTimeString().slice(0, 5);
    }
    return "";
  });

  const [arrivalTime, setArrivalTime] = useState<string>(() => {
    if (travelData?.arrivalTime) {
      return new Date(travelData.arrivalTime).toTimeString().slice(0, 5);
    }
    return "";
  });

  // Set the document title for the page
  useEffect(() => {
    document.title = "Plan Your Ride";
  }, []);

  /**
   * Handles the form submission, combining the selected date with the selected departure/arrival times,
   * and dispatches the travel information to Redux before navigating to the ChooseRidePage.
   */
  const handleSubmit = async () => {
    const currentDate = new Date();

    // Combine date with the selected departure and arrival times
    const combinedDepartureTime = new Date(
      `${currentDate.toDateString()} ${departureTime}`
    ).toLocaleString();
    const combinedArrivalTime = new Date(
      `${currentDate.toDateString()} ${arrivalTime}`
    ).toLocaleString();

    // Create a route request object
    const routeRequest: IRoute = {
      origin: departure,
      destination: destination,
      departureTime: combinedDepartureTime,
      arrivalTime: combinedArrivalTime,
    };

    console.log(routeRequest);

    dispatch(clearRoute()); // Clear any previous route data in Redux
    dispatch(setTravel(routeRequest)); // Save the travel information in Redux
    navigate(AppRoutes.CHOOSE_RIDE_PAGE); // Navigate to ChooseRidePage
  };

  /**
   * Uses the Geolocation API to retrieve the user's current location and auto-populates
   * the "Departure" field with a formatted address using the Google Geocoding API.
   */
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiGlobalKey}`
            );
            if (!response.ok) {
              throw new Error("Failed to retrieve location information");
            }
            const data = await response.json();
            if (data.status === "OK") {
              const address = data.results[0]?.formatted_address;
              if (address) {
                setDeparture(address); // Set the formatted address as the departure location
              } else {
                throw new Error("No address found");
              }
            } else {
              throw new Error("Geocoding API error");
            }
          } catch (error) {
            console.error("Error getting location:", error);
            setDeparture(
              `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`
            ); // Fallback to coordinates
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="rgba(0, 0, 0, 0.1)" // Light background
    >
      <Box
        width={isNonMobileScreens ? "50%" : "93%"} // Adjust width for larger screens
        p="2rem"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.paper} // Card-like appearance
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" // Light shadow for the card
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {/* Animated Title */}
          <Grow in timeout={1000}>
            <Typography
              variant="h2"
              fontWeight="bold"
              mb="1rem"
              color={theme.palette.primary.main}
            >
              Where Are You Heading?
            </Typography>
          </Grow>

          {/* Form Fields */}
          <Grow in timeout={1500}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Departure"
                  variant="outlined"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                  inputProps={{ dir: "auto" }} // Automatic direction
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Destination"
                  variant="outlined"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                  inputProps={{ dir: "auto" }} // Automatic direction
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Departure Time
                </Typography>
                <TextField
                  type="time"
                  variant="outlined"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  fullWidth
                  inputProps={{ step: 300 }} // 5 minutes interval
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Arrival Time
                </Typography>
                <TextField
                  type="time"
                  variant="outlined"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  fullWidth
                  inputProps={{ step: 300 }} // 5 minutes interval
                />
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLocateMe}
                  fullWidth
                >
                  Locate Me
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!departure || !destination} // Disable button if fields are empty
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grow>
        </Box>
      </Box>
    </Box>
  );
};

export default PlanRidePage;
