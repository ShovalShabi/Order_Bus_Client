import { useState } from "react";
import OrderBusResponse from "../bounderies/orderBus/orderBusResponse";
import RouteFlow from "../bounderies/orderBus/routeFlow";
import CustomMap from "../components/CustomMap";
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

// Stub data for visualization
const stubData: OrderBusResponse[] = [
  new OrderBusResponse(
    "Origin A",
    "Destination A",
    "08:00 AM",
    "09:00 AM",
    "2024-08-28T08:00:00Z",
    new RouteFlow([], [])
  ),
  new OrderBusResponse(
    "Origin B",
    "Destination B",
    "09:00 AM",
    "10:00 AM",
    "2024-08-28T09:00:00Z",
    new RouteFlow([], [])
  ),
];

export default function ChooseRidePage() {
  const [selectedRide, setSelectedRide] = useState<OrderBusResponse | null>(
    null
  );

  return (
    <Container
      maxWidth="xl"
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Top Section: Title */}
      <Typography variant="h4" sx={{ my: 2 }}>
        Choose Your Ride
      </Typography>

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left Pane: Ride options */}
        <Box
          sx={{
            width: "30%",
            overflowY: "auto",
            p: 2,
            backgroundColor: "#96C9F4",
          }}
        >
          <Typography variant="h6">Available Rides</Typography>
          <List>
            {stubData.map((ride, index) => (
              <ListItem
                key={index}
                button
                onClick={() => setSelectedRide(ride)}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  mb: 2,
                }}
              >
                <ListItemText
                  primary={`${ride.origin} to ${ride.destination}`}
                  secondary={`Time: ${ride.initialDepartureTime} - ${ride.finalArrivalTime}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Pane: Map */}
        <Box sx={{ flex: 1 }}>
          <CustomMap />
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
          onClick={() => console.log("Go Back clicked")}
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
