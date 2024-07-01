import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import getEnvVariables from "../etc/loadVariables";

interface Position {
  lat: number;
  lng: number;
}

export default function CustomMap() {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [open, setOpen] = useState(false);

  const { apiGlobalKey, mapID } = getEnvVariables();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location", error);
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
          <Map center={currentPosition} mapId={mapID}>
            <AdvancedMarker
              position={currentPosition}
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
                position={currentPosition}
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
