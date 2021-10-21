import L from "leaflet";
import { Marker } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import { IStation } from "../types";

type StationMarkerSvgProps = {
  freeBikesCount: number;
};

const StationMarkerSvg: React.FC<StationMarkerSvgProps> = ({
  freeBikesCount,
}) => {
  let countColor = "#8b0000";

  if (freeBikesCount > 0) {
    if (freeBikesCount > 5) {
      countColor = "#228c22";
    } else {
      countColor = "#ff8c00";
    }
  }

  return (
    <svg
      width="50px"
      height="50px"
      viewBox="0 0 42 42"
      className="donut"
      aria-labelledby="beers-title beers-desc"
      role="img"
    >
      <circle
        className="donut-hole"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="white"
        role="presentation"
      ></circle>
      <circle
        className="donut-ring"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        stroke="#d2d3d4"
        strokeWidth="3"
        role="presentation"
      ></circle>
      <circle
        className="donut-segment"
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        stroke={countColor}
        strokeWidth="3"
        aria-labelledby="donut-segment-1-title donut-segment-1-desc"
      ></circle>
      <g className="chart-text">
        <text
          className="chart-number"
          x="50%"
          y="50%"
          text-anchor="middle"
          dy=".3em"
        >
          {freeBikesCount}
        </text>
      </g>
    </svg>
  );
};

const StationMarker: React.FC<{
  station: IStation | Pick<IStation, "latitude" | "longitude" | "free_bikes">;
}> = ({ station }) => {
  const icon = L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(
      <StationMarkerSvg freeBikesCount={station.free_bikes || 0} />
    ),
  });

  if (!(station.latitude && station.longitude)) {
    return null;
  }

  return (
    <Marker position={[station.latitude, station.longitude]} icon={icon} />
  );
};

export default StationMarker;
