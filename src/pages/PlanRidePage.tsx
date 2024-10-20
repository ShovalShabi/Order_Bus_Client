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

const PlanRidePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { apiGlobalKey } = getEnvVariables();

  // Get theme and media query from Material-UI
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Get the travel data from Redux store
  const travelData = useSelector((state: State) => state.lastTravel);

  // Set initial state based on Redux store or default to empty strings
  const [departure, setDeparture] = useState<string>(travelData?.origin || "");
  const [destination, setDestination] = useState<string>(
    travelData?.destination || ""
  );

  useEffect(() => {
    document.title = "Plan Your Ride";
  }, []);

  const [departureTime, setDepartureTime] = useState<string>(() => {
    if (travelData?.departureTime) {
      // If departureTime is not null, format it as a string
      return new Date(travelData.departureTime).toTimeString().slice(0, 5);
    }
    // Return an empty string if departureTime is null
    return "";
  });

  const [arrivalTime, setArrivalTime] = useState<string>(() => {
    if (travelData?.arrivalTime) {
      // If arrivalTime is not null, format it as a string
      return new Date(travelData.arrivalTime).toTimeString().slice(0, 5);
    }
    // Return an empty string if arrivalTime is null
    return "";
  });

  const handleSubmit = async () => {
    // Combine the current date with the selected time
    const currentDate = new Date();
    const combinedDepartureTime = new Date(
      `${currentDate.toDateString()} ${departureTime}`
    ).toLocaleString();
    const combinedArrivalTime = new Date(
      `${currentDate.toDateString()} ${arrivalTime}`
    ).toLocaleString();

    // Create RouteRequestBoundary
    const routeRequest: IRoute = {
      origin: departure,
      destination: destination,
      departureTime: combinedDepartureTime,
      arrivalTime: combinedArrivalTime,
    };

    console.log(routeRequest);

    dispatch(clearRoute());
    // Store the last travel in Redux state
    dispatch(setTravel(routeRequest));
    navigate(AppRoutes.CHOOSE_RIDE_PAGE);
  };

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
              // Extract the formatted address from the API response
              const address = data.results[0]?.formatted_address;
              if (address) {
                setDeparture(address); // Set the departure field to the street address
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
            );
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
      bgcolor="rgba(0, 0, 0, 0.1)" // Light background for the page
    >
      <Box
        width={isNonMobileScreens ? "50%" : "93%"} // Adjust width based on screen size
        p="2rem"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.paper} // Card background
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" // Light shadow for the card
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
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
                  disabled={!departure || !destination}
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
