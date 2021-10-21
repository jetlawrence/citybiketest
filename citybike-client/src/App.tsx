import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { MapContainer, Pane, TileLayer, Marker, Popup } from "react-leaflet";
import BikesMap from "./components/BikesMap";
import { API_DEV_ENDPOINT } from "./constants";
import { IStation } from "./types";

type MapState = {
  position: [number, number];
  zoom: number;
};

const App: React.FC = () => {
  const [mapState, setMapState] = useState<MapState>({
    position: [25.790654, -80.1300455],
    zoom: 13,
  });
  const [stations, setStations] = useState<IStation[]>([]);

  useEffect(() => {
    const socket = socketIOClient(API_DEV_ENDPOINT);

    socket.on(
      "CityBike",
      (data?: {
        location: {
          latitude: number;
          longitude: number;
        };
        stations: IStation[];
      }) => {
        if (!data) {
          return;
        }

        if (data.location?.latitude && data.location?.longitude) {
          setMapState({
            ...mapState,
            position: [data.location.latitude, data.location.longitude],
          });
        }

        setStations(data.stations ?? []);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="map">
      <h1> City Bikes in Miami </h1>
      <BikesMap
        center={mapState.position}
        zoom={mapState.zoom}
        stations={stations}
      />
    </div>
  );
};

export default App;
