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

const PlanRidePage: React.FC = () => {
  const [departure, setDeparture] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departureTime, setDepartureTime] = useState<string>("");
  const [destinationTime, setDestinationTime] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setSubmitted(true);
    navigate("/select-route");
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
                inputProps={{ dir: "auto" }} // Support RTL and UTF-8
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Destination"
                variant="outlined"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                fullWidth
                inputProps={{ dir: "auto" }} // Support RTL and UTF-8
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
                Destination Time
              </Typography>
              <TextField
                type="time"
                variant="outlined"
                value={destinationTime}
                onChange={(e) => setDestinationTime(e.target.value)}
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
                  !departure ||
                  !destination ||
                  !departureTime ||
                  !destinationTime
                }
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grow>
        {submitted && (
          <Grow in timeout={2000}>
            <Box mt={4}>
              <Typography variant="h6">Departure: {departure}</Typography>
              <Typography variant="h6">Destination: {destination}</Typography>
              <Typography variant="h6">
                Departure Time: {departureTime}
              </Typography>
              <Typography variant="h6">
                Destination Time: {destinationTime}
              </Typography>
            </Box>
          </Grow>
        )}
      </Box>
    </Container>
  );
};

export default PlanRidePage;
