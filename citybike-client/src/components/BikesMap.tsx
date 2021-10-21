import React, { useEffect, useState } from "react";
import {
  MapContainer,
  MapContainerProps,
  Marker,
  TileLayer,
  useMap,
} from "react-leaflet";
import { IStation } from "../types";
import StationMarker from "./StationMarker";

type Props = MapContainerProps & {
  stations?: IStation[];
};

type ChangeViewProps = Pick<MapContainerProps, "center" | "zoom">;

const ChangeView: React.FC<ChangeViewProps> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, []);

  return null;
};

const BikesMap: React.FC<Props> = ({ stations = [], ...props }) => {
  const [hasLoadedView, setHasLoadedView] = useState(false);

  return (
    <MapContainer {...props}>
      {props.center && <ChangeView center={props.center} />}
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((station) => {
        if (!(station.latitude && station.longitude)) {
          return null;
        }

        return <StationMarker key={station.id} station={station} />;
      })}
    </MapContainer>
  );
};

export default BikesMap;
