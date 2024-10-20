import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import getEnvVariables from "../etc/loadVariables"; // Import environment variables
import { ILocation } from "../utils/Location"; // Interface for location
import { IRoute } from "../dto/orderBus/IRoute"; // Interface for route data
import Direction from "./Direction"; // Custom direction component
import { Box, Typography } from "@mui/material";

/**
 * @function CustomMap
 * A React component that renders a Google Map using the vis.gl react-google-maps library.
 * The map displays the user's current location with the ability to display an info window and a direction component for bus routes.
 *
 * @param {IRoute} props - The route details such as origin, destination, departureTime, and arrivalTime.
 *
 * @returns {JSX.Element} - A rendered map with the current position and directions overlaid.
 */
export default function CustomMap({
  origin,
  destination,
  departureTime,
  arrivalTime,
}: IRoute) {
  // State to track the user's current position
  const [currentPosition, setCurrentPosition] = useState<ILocation | null>(
    null
  );

  // State for zoom level
  const [zoom, setZoom] = useState(18);

  // State for whether the info window is open
  const [open, setOpen] = useState(false);

  /**
   * @function handleZoomChange
   * Event handler for when the map zoom level changes.
   * Updates the zoom level in the component state.
   *
   * @param {MapCameraChangedEvent} event - The event triggered when the map zoom changes.
   */
  const handleZoomChange = (event: MapCameraChangedEvent) => {
    setZoom(Number(event.detail.zoom)); // Set the zoom level based on the event details
  };

  // Get environment variables for API keys and map configurations
  const { apiGlobalKey, mapID } = getEnvVariables();

  // UseEffect hook to get the user's current location via the browser's geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude }); // Update the current position
        },
        (error) => {
          console.error("Error getting location", error); // Handle errors
        },
        {
          enableHighAccuracy: true, // Use high-accuracy mode
          timeout: 5000, // Timeout after 5 seconds
          maximumAge: 0, // Do not use cached location
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <APIProvider apiKey={apiGlobalKey}>
      <Box sx={{ height: "100vh", width: "100%", position: "relative" }}>
        {/* Render map if currentPosition is available */}
        {currentPosition ? (
          <>
            <Map
              defaultCenter={{
                lat: currentPosition.latitude,
                lng: currentPosition.longitude,
              }} // Center map at current position
              mapId={mapID} // Use the map ID from environment variables
              zoom={zoom} // Set the initial zoom level
              onZoomChanged={handleZoomChange} // Trigger zoom change handler
              style={{ height: "100%", width: "100%" }} // Full-size map
            >
              <AdvancedMarker
                position={{
                  lat: currentPosition.latitude,
                  lng: currentPosition.longitude,
                }} // Position marker at current location
                onClick={() => setOpen(true)} // Open info window on click
              >
                <Pin
                  background={"grey"}
                  borderColor={"green"}
                  glyphColor={"purple"}
                />
              </AdvancedMarker>

              {/* Display InfoWindow when 'open' is true */}
              {open && (
                <InfoWindow
                  position={{
                    lat: currentPosition.latitude,
                    lng: currentPosition.longitude,
                  }}
                  onCloseClick={() => setOpen(false)} // Close the window on click
                >
                  <Typography>Your current location</Typography>
                </InfoWindow>
              )}
            </Map>

            {/* Overlay direction component on the map */}
            <Box
              sx={{
                position: "absolute",
                top: "60px",
                left: "10px",
                zIndex: 1000, // Ensure the box appears above the map
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Light shadow for the overlay box
              }}
            >
              {/* Render the Direction component for the current route */}
              <Direction
                origin={origin}
                destination={destination}
                departureTime={departureTime}
                arrivalTime={arrivalTime}
              />
            </Box>
          </>
        ) : (
          <Typography>Loading...</Typography> // Display loading text while waiting for position
        )}
      </Box>
    </APIProvider>
  );
}
