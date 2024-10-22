import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { IRoute } from "../dto/orderBus/IRoute";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { clearRoute, setRoute } from "../states/reducer";
import convertRouteToSerializable from "../states/routeConverter";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

/**
 * @function Direction
 * React component that fetches and renders directions for transit routes (bus routes) using Google Maps services.
 * Allows users to view alternative routes, toggle them, and get detailed step information.
 *
 * @param {IRoute} props - The route details including origin, destination, departureTime, and arrivalTime.
 *
 * @returns {JSX.Element} - The rendered transit route information.
 */
const Direction = ({
  origin,
  destination,
  departureTime,
  arrivalTime,
}: IRoute) => {
  const map = useMap(); // Access the map instance
  const routesLibrary = useMapsLibrary("routes"); // Access Google Maps routes service
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState<number>(-1);
  const [open, setOpen] = useState<number | null>(null); // Manage dropdown open/close per item

  const dispatch = useDispatch();

  // Update selected route based on routeIndex
  const selectedRoute = routes[routeIndex] || null;
  const leg = selectedRoute?.legs[0] || null;

  /**
   * @useEffect Initializes the Google Maps DirectionsService and DirectionsRenderer when the map or routes library is ready.
   */
  useEffect(() => {
    if (!routesLibrary || !map) {
      console.log("Google Maps library or map instance is not available yet.");
      return;
    }

    const service = new routesLibrary.DirectionsService();
    const renderer = new routesLibrary.DirectionsRenderer({ map });

    setDirectionsService(service);
    setDirectionsRenderer(renderer);

    console.log("DirectionsService and DirectionsRenderer initialized.");
  }, [routesLibrary, map]);

  /**
   * @useEffect Fetches the transit routes between the origin and destination when the directions service is ready.
   * Filters only the bus routes and sorts them by duration.
   */
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.TRANSIT,
      transitOptions: {
        modes: [google.maps.TransitMode.BUS],
        departureTime: departureTime ? new Date(departureTime) : null,
        arrivalTime: arrivalTime ? new Date(arrivalTime) : null,
      },
      provideRouteAlternatives: true, // Request alternative routes
    };

    directionsService
      .route(request)
      .then((result) => {
        // Filter routes to include only those with bus transit
        const filteredRoutes = result.routes.filter((route) =>
          route.legs.some((leg) =>
            leg.steps.some(
              (step) =>
                step.travel_mode === google.maps.TravelMode.TRANSIT &&
                step.transit?.line?.vehicle?.type ===
                  google.maps.VehicleType.BUS
            )
          )
        );

        // Sort routes by duration
        const sortedRoutes = filteredRoutes.sort((a, b) => {
          const durationA = a.legs[0].duration?.value ?? Infinity;
          const durationB = b.legs[0].duration?.value ?? Infinity;
          return durationA - durationB;
        });

        directionsRenderer.setDirections({
          ...result,
          routes: sortedRoutes, // Set filtered and sorted routes in the renderer
        });

        setRoutes(sortedRoutes); // Update routes in state
      })
      .catch((error) => {
        console.error("Error fetching routes:", error);
      });
  }, [
    origin,
    destination,
    departureTime,
    arrivalTime,
    directionsService,
    directionsRenderer,
  ]);

  /**
   * @useEffect Updates the currently selected route in the map renderer.
   */
  useEffect(() => {
    if (directionsRenderer && routes.length > 0) {
      directionsRenderer.setRouteIndex(routeIndex);
    }
  }, [routeIndex, directionsRenderer, routes.length]);

  /**
   * @function handleRouteClick
   * Handles the selection and deselection of a route.
   * @param {number} index - The index of the selected route.
   */
  const handleRouteClick = (index: number) => {
    if (index === routeIndex) {
      setRouteIndex(-1); // Deselect the current route
      setOpen(null); // Close the dropdown
      dispatch(clearRoute()); // Clear the selected route from the state
    } else {
      setRouteIndex(index); // Select the new route
      setOpen(index); // Open the dropdown for the selected route
      const selectedRoute = routes[index];
      if (selectedRoute) {
        const serializableRoute = convertRouteToSerializable(selectedRoute); // Convert route to a serializable format
        dispatch(setRoute(serializableRoute)); // Dispatch the new route
      }
    }
  };

  /**
   * @function renderRouteSummary
   * Renders the visual summary of the steps in a route, showing walking and bus icons.
   * @param {google.maps.DirectionsStep[]} steps - The steps of the route.
   * @returns {JSX.Element} - A visual summary of the route steps.
   */
  const renderRouteSummary = (steps: google.maps.DirectionsStep[]) => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {steps.map((step, index) => {
          const isLastStep = index === steps.length - 1;
          return (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              {step.travel_mode === google.maps.TravelMode.WALKING && (
                <DirectionsWalkIcon />
              )}
              {step.travel_mode === google.maps.TravelMode.TRANSIT && (
                <>
                  <DirectionsBusIcon />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    {step.transit?.line?.short_name}
                  </Typography>
                </>
              )}
              {!isLastStep && <ArrowForwardIcon />}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box>
      {/* Display a message if no routes are available */}
      {routes.length === 0 ? (
        <Typography variant="body2">No selected route available</Typography>
      ) : (
        <>
          {selectedRoute && (
            <>
              {/* Display the selected route summary */}
              <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                {selectedRoute.summary || `Route ${routeIndex + 1}`}
              </Typography>
              <Typography variant="body2">
                {leg?.start_address.split(",")[0]} to{" "}
                {leg?.end_address.split(",")[0]}
              </Typography>
              <Typography variant="body2">
                Distance: {leg?.distance?.text}
              </Typography>
              <Typography variant="body2">
                Duration: {leg?.duration?.text}
              </Typography>
              <Typography variant="body2">
                Departure time: {leg?.departure_time?.text}
              </Typography>
            </>
          )}
          <Typography variant="h6" component="h2" sx={{ mt: 1 }}>
            Available Routes
          </Typography>
          <List
            sx={{
              maxHeight: "300px", // Set a max height for the list
              overflowY: "auto", // Enable vertical scrolling if content exceeds the height
            }}
          >
            {routes.map((route, index) => (
              <Box key={index}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleRouteClick(index)}>
                    <ListItemText
                      sx={{
                        width: "100%", // Ensure it takes up full width available
                        maxWidth: "400px", // Set a max width for larger screens
                        margin: "0 auto", // Center the box on the screen
                      }}
                      primary={
                        <>
                          {/* Render the route summary with icons */}
                          {renderRouteSummary(route.legs[0].steps)}

                          {/* Departure and arrival time displayed below the summary */}
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Departure:{" "}
                            {route.legs[0].departure_time?.text || "N/A"}
                          </Typography>
                          <Typography variant="body2">
                            Arrival: {route.legs[0].arrival_time?.text || "N/A"}
                          </Typography>
                        </>
                      }
                    />
                    {open === index ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={open === index} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 4 }}>
                    {route.legs[0].steps.map((step, stepIndex) => (
                      <ListItem key={stepIndex}>
                        <ListItemText primary={step.instructions} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
                {index !== routes.length - 1 && <Divider />}{" "}
                {/* Add divider between items except the last one */}
              </Box>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default Direction;
