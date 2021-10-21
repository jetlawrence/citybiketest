import React from "react";
import { MapContainer, MapContainerProps, TileLayer } from "react-leaflet";

type Props = MapContainerProps;

const BikesMap: React.FC<Props> = (props) => {
  return (
    <MapContainer {...props}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default BikesMap;
