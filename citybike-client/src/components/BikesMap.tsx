import { useEffect, useRef } from "react";
import {
  MapContainer,
  MapContainerProps,
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
  const prevCenterRef = useRef<MapContainerProps["center"]>();

  useEffect(() => {
    if (!center) {
      return;
    }

    const getLatLngFromCenter = (c: MapContainerProps["center"]) => {
      let lat;
      let lng;
      if (Array.isArray(c)) {
        lat = c[0];
        lng = c[1];
      } else {
        lat = c?.lat;
        lng = c?.lng;
      }

      return [lat, lng];
    };

    if (
      !getLatLngFromCenter(center).every(
        (coord, i) => getLatLngFromCenter(prevCenterRef.current)[i] === coord
      )
    ) {
      map.setView(center);
    }

    prevCenterRef.current = center;
  }, [center, map]);

  return null;
};

const BikesMap: React.FC<Props> = ({ stations = [], ...props }) => {
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
