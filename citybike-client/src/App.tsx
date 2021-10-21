import BikesMap from "./components/BikesMap";
import { useCityBike } from "./contexts/CityBikeContext";
import ControlPanel from "./components/ControlPanel";
import "./App.css";

const App: React.FC = () => {
  const cityBike = useCityBike();

  return (
    <div className="map">
      <div className="Header">
        <h1> City Bikes in Miami </h1>
        <ControlPanel />
      </div>

      {cityBike?.mapState && (
        <BikesMap
          center={cityBike?.mapState.position}
          zoom={cityBike?.mapState.zoom}
          stations={cityBike?.stations ?? []}
        />
      )}
    </div>
  );
};

export default App;
