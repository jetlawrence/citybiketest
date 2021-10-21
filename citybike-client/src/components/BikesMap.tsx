import {
  MapContainer,
  MapContainerProps,
  Marker,
  TileLayer,
} from "react-leaflet";
import { IStation } from "../types";
import StationMarker from "./StationMarker";

type Props = MapContainerProps & {
  stations?: IStation[];
};

const BikesMap: React.FC<Props> = ({ stations = [], ...props }) => {
  return (
    <MapContainer {...props}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((station) => {
        if (!(station.latitude && station.longitude)) {
          return null;
        }

        const position: [number, number] = [
          station.latitude,
          station.longitude,
        ];

        return <StationMarker key={station.id} station={station} />;
      })}
    </MapContainer>
  );
};

export default BikesMap;
