import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Grow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTravel, State } from "../states/reducer";
import { IRoute } from "../bounderies/orderBus/IRoute";
import AppRoutes from "../utils/AppRoutes";

const PlanRidePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the travel data from Redux store
  const travelData = useSelector((state: State) => state.lastTravel);

  // Set initial state based on Redux store or default to empty strings
  const [departure, setDeparture] = useState<string>(travelData?.origin || "");
  const [destination, setDestination] = useState<string>(
    travelData?.destination || ""
  );

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
    );
    const combinedArrivalTime = new Date(
      `${currentDate.toDateString()} ${arrivalTime}`
    );

    // Create RouteRequestBoundary
    const routeRequest: IRoute = {
      origin: departure,
      destination: destination,
      departureTime: combinedDepartureTime,
      arrivalTime: combinedArrivalTime,
    };

    console.log(
      `departure time: ${combinedDepartureTime}, arrivalTime: ${combinedArrivalTime}`
    );
    console.log(routeRequest);

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
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            if (!response.ok) {
              throw new Error("Failed to retrieve city information");
            }
            const data = await response.json();
            setDeparture(data.locality);
          } catch (error) {
            console.error("Error getting location:", error);
            setDeparture(
              `Lat: ${latitude.toFixed(6)}, Long: ${longitude.toFixed(6)}`
            );
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="background.default"
      >
        <Grow in timeout={1000}>
          <Typography variant="h4" gutterBottom>
            Where are you heading?
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
                inputProps={{ dir: "auto" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Destination"
                variant="outlined"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                fullWidth
                inputProps={{ dir: "auto" }}
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
                disabled={
                  !departure || !destination || !departureTime || !arrivalTime
                }
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grow>
      </Box>
    </Container>
  );
};

export default PlanRidePage;
