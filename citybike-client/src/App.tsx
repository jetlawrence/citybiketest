import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { MapContainer, Pane, TileLayer, Marker, Popup } from "react-leaflet";
import BikesMap from "./components/BikesMap";
import { API_DEV_ENDPOINT } from "./constants";

type MapState = {
  position: [number, number];
  zoom: number;
};

const App: React.FC = () => {
  const [mapState] = useState<MapState>({
    position: [51.505, -0.09],
    zoom: 13,
  });

  useEffect(() => {
    const socket = socketIOClient(API_DEV_ENDPOINT);

    socket.on("CityBike", (data) => {
      console.log("Data from CityBike", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="map">
      <h1> City Bikes in Miami </h1>
      <BikesMap center={mapState.position} zoom={mapState.zoom} />
    </div>
  );
};

export default App;
