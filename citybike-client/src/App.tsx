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
        <ControlPanel
          onFastBackward={cityBike?.onFastBackward}
          onFastForward={cityBike?.onFastForward}
          onStepBackward={cityBike?.onStepBackward}
          onStepForward={cityBike?.onStepForward}
          onPlay={cityBike?.onPlay}
          onPause={cityBike?.onPause}
          isPaused={cityBike?.historyIndexOnView !== null}
        />
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
