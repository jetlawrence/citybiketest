import BikesMap from "./components/BikesMap";
import { useCityBike } from "./contexts/CityBikeContext";
import ControlPanel from "./components/ControlPanel";
import "./App.css";

const App: React.FC = () => {
  const cityBike = useCityBike();

  const renderLoading = () => <div>Fetching data...</div>;
  const renderError = () => (
    <div>Error fetching data. Trying to refetch...</div>
  );
  const renderCounts = () => (
    <div>
      <div>
        {`As of ${
          cityBike?.currentTimestamp
            ? new Date(cityBike.currentTimestamp).toLocaleString()
            : ""
        }`}{" "}
      </div>
      <div
        style={{ marginLeft: "10px" }}
      >{`${cityBike?.freeBikesCount} free bikes`}</div>
      <div
        style={{ marginLeft: "10px" }}
      >{`${cityBike?.emptySlotsCount} empty slots`}</div>
    </div>
  );

  return (
    <div className="map">
      <div className="Header">
        <div>
          <h1> City Bikes in Miami </h1>
          {cityBike?.hasError
            ? renderError()
            : !cityBike?.hasLoaded
            ? renderLoading()
            : renderCounts()}
        </div>
        {cityBike?.hasLoaded && (
          <ControlPanel
            onFastBackward={cityBike?.onFastBackward}
            onFastForward={cityBike?.onFastForward}
            onStepBackward={cityBike?.onStepBackward}
            onStepForward={cityBike?.onStepForward}
            onPlay={cityBike?.onPlay}
            onPause={cityBike?.onPause}
            isPaused={cityBike?.historyIndexOnView !== null}
            canRewind={cityBike.canRewind}
            canForward={cityBike.canForward}
          />
        )}
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
