import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import getEnvVariables from "../etc/loadVariables";
import { ILocation } from "../utils/Location";
import { IRoute } from "../dto/orderBus/IRoute";
import Direction from "./Direction";
import { Box, Typography } from "@mui/material";

export default function CustomMap({
  origin,
  destination,
  departureTime,
  arrivalTime,
}: IRoute) {
  const [currentPosition, setCurrentPosition] = useState<ILocation | null>(
    null
  );
  const [zoom, setZoom] = useState(18);
  const [open, setOpen] = useState(false);

  const handleZoomChange = (event: MapCameraChangedEvent) => {
    setZoom(Number(event.detail.zoom));
  };

  const { apiGlobalKey, mapID } = getEnvVariables();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <APIProvider apiKey={apiGlobalKey}>
      <Box sx={{ height: "100vh", width: "100%", position: "relative" }}>
        {currentPosition ? (
          <>
            <Map
              defaultCenter={{
                lat: currentPosition.latitude,
                lng: currentPosition.longitude,
              }}
              mapId={mapID}
              zoom={zoom}
              onZoomChanged={handleZoomChange}
              style={{ height: "100%", width: "100%" }}
            >
              <AdvancedMarker
                position={{
                  lat: currentPosition.latitude,
                  lng: currentPosition.longitude,
                }}
                onClick={() => setOpen(true)}
              >
                <Pin
                  background={"grey"}
                  borderColor={"green"}
                  glyphColor={"purple"}
                />
              </AdvancedMarker>

              {open && (
                <InfoWindow
                  position={{
                    lat: currentPosition.latitude,
                    lng: currentPosition.longitude,
                  }}
                  onCloseClick={() => setOpen(false)}
                >
                  <Typography>Your current location</Typography>
                </InfoWindow>
              )}
            </Map>
            <Box
              sx={{
                position: "absolute",
                top: "60px",
                left: "10px",
                zIndex: 1000,
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Direction
                origin={origin}
                destination={destination}
                departureTime={departureTime}
                arrivalTime={arrivalTime}
              />
            </Box>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </APIProvider>
  );
}
