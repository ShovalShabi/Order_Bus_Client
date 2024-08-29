import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

interface DirectionsProps {
  origin: string;
  destination: string;
}

const Direction = ({ origin, destination }: DirectionsProps) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();

  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();

  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);

  //   const [routeIndex, setRouteIndex] = useState(0);
  //   const selected = routes[routeIndex];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.TRANSIT,
      transitOptions: {
        modes: [google.maps.TransitMode.BUS],
      },
      provideRouteAlternatives: true,
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        if (result) setRoutes(result.routes);
      } else {
        console.error(`Directions request failed due to ${status}`);
      }
    });
  }, [origin, destination, directionsService, directionsRenderer]);

  console.log(routes);
  return <div>Direction</div>;
};

export default Direction;
