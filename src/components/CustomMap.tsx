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
  const [busStations, setBusStations] = useState([]); // A list of bus staions according to user's selection

  const handleZoomChange = (event: MapCameraChangedEvent) => {
    setZoom(Number(event.detail.zoom));
  };

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
          <Map
            defaultCenter={currentPosition}
            mapId={mapID}
            zoom={zoom}
            onZoomChanged={handleZoomChange}
          >
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
