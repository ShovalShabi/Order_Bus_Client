import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { IRoute } from "../bounderies/orderBus/IRoute";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setRoute } from "../states/reducer";
import convertRouteToSerializable from "../states/routeConverter";

const Direction = ({
  origin,
  destination,
  departureTime,
  arrivalTime,
}: IRoute) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const [open, setOpen] = useState(false); // State for managing dropdown visibility

  const dispatch = useDispatch();

  const selectedRoute = routes[routeIndex] || null;
  const leg = selectedRoute?.legs[0] || null;

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
      provideRouteAlternatives: true,
    };

    directionsService
      .route(request)
      .then((result) => {
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

        const sortedRoutes = filteredRoutes.sort((a, b) => {
          const durationA = a.legs[0].duration?.value ?? Infinity;
          const durationB = b.legs[0].duration?.value ?? Infinity;
          return durationA - durationB;
        });

        directionsRenderer.setDirections({
          ...result,
          routes: sortedRoutes,
        });

        setRoutes(sortedRoutes);
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

  useEffect(() => {
    if (directionsRenderer && routes.length > 0) {
      directionsRenderer.setRouteIndex(routeIndex);
    }
  }, [routeIndex, directionsRenderer, routes.length]);

  const handleRouteClick = (index: number) => {
    setRouteIndex(index);
    setOpen((prevOpen) => (index === routeIndex ? !prevOpen : true));

    if (selectedRoute) {
      const serializableRoute = convertRouteToSerializable(selectedRoute);
      dispatch(setRoute(serializableRoute));
    }
  };

  return (
    <Box>
      {selectedRoute ? (
        <>
          <Typography variant="h6" component="h2">
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
      ) : (
        <Typography variant="body2">No selected route available</Typography>
      )}

      <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
        Other Routes
      </Typography>
      <List>
        {routes.map((route, index) => (
          <Box key={index}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleRouteClick(index)}>
                <ListItemText primary={route.summary || `Route ${index + 1}`} />
                {open && index === routeIndex ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse
              in={open && index === routeIndex}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding sx={{ pl: 4 }}>
                {route.legs[0].steps.map((step, stepIndex) => (
                  <ListItem key={stepIndex}>
                    <ListItemText primary={step.instructions} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Direction;
