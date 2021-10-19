import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const App = () => {
  const [state, setState] = useState({
    response: false,
    endpoint: "http://127.0.0.1:4001",
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  });

  useEffect(() => {
    const { endpoint } = state;
    const socket = socketIOClient(endpoint);
  }, []);

  const response = state?.response;
  const position = [state?.lat, state?.lng];

  return (
    <div className="map">
      <h1> City Bikes in Miami </h1>
      <MapContainer center={position} zoom={state?.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default App;
