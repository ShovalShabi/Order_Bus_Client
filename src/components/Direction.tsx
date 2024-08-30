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
} from "@mui/material";

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
        departureTime,
        arrivalTime,
      },
      provideRouteAlternatives: true,
    };

    directionsService
      .route(request)
      .then((result) => {
        directionsRenderer.setDirections(result);
        console.log("Routes found:", result.routes);
        setRoutes(result.routes);
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

  return (
    <Box>
      {selectedRoute ? (
        <>
          <Typography variant="h6" component="h2">
            {selectedRoute.summary}
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
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => setRouteIndex(index)}>
              <ListItemText primary={route.summary} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Direction;
