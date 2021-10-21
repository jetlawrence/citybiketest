import BikesMap from "./components/BikesMap";
import { useCityBike } from "./contexts/CityBikeContext";

const App: React.FC = () => {
  const cityBike = useCityBike();

  return (
    <div className="map">
      <h1> City Bikes in Miami </h1>
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
