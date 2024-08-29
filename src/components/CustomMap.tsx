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

export default function CustomMap() {
  const [currentPosition, setCurrentPosition] = useState<ILocation | null>(
    null
  );
  const [zoom, setZoom] = useState(18); // Initial zoom level
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
          enableHighAccuracy: true, // Request high accuracy
          timeout: 5000, // Optional: Timeout after 5 seconds
          maximumAge: 0, // Optional: Do not use a cached position
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <APIProvider apiKey={apiGlobalKey}>
      <div style={{ height: "100vh", width: "100%" }}>
        {currentPosition ? (
          <Map
            defaultCenter={{
              lat: currentPosition.latitude,
              lng: currentPosition.longitude,
            }}
            mapId={mapID}
            zoom={zoom}
            onZoomChanged={handleZoomChange}
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
                <p>Your current location</p>
              </InfoWindow>
            )}
          </Map>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </APIProvider>
  );
}
