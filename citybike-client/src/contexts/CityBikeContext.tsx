import { IStation } from "../types";
import socketIOClient from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import { API_DEV_ENDPOINT } from "../constants";

const MAX_HISTORY_LENGTH = 20;

type MapState = {
  position: [number, number];
  zoom: number;
};

export interface ICityBikeContext {
  mapState: MapState;
  stations: IStation[];
}

const CityBikeContext = createContext<ICityBikeContext | undefined>(undefined);

type BikesHistoryItem = {
  timestamp: string;
  stations: IStation[];
};

const CityBikeContextProvider: React.FC = ({ children }) => {
  const [mapState, setMapState] = useState<MapState>({
    position: [25.790654, -80.1300455],
    zoom: 13,
  });
  const [stations, setStations] = useState<IStation[]>([]);
  const [history, setHistory] = useState<BikesHistoryItem[]>([]);

  const pushToHistory = (item: BikesHistoryItem) =>
    setHistory([
      ...(history.length > MAX_HISTORY_LENGTH
        ? history.slice(1, MAX_HISTORY_LENGTH)
        : history),
      item,
    ]);

  useEffect(() => {
    if (!stations.length) {
      return;
    }

    const latestTimestamp = new Date(
      Math.max(
        ...stations.map((station) =>
          station.timestamp ? new Date(station.timestamp).getTime() : 0
        )
      )
    ).toISOString();

    const latestHistoryItemTimestamp = history.length
      ? new Date(
          Math.max(
            ...history.map((item) =>
              item.timestamp ? new Date(item.timestamp).getTime() : 0
            )
          )
        ).toISOString()
      : "";

    if (latestTimestamp !== latestHistoryItemTimestamp) {
      pushToHistory({
        timestamp: latestTimestamp,
        stations,
      });
    }
  }, [stations]);

  useEffect(() => {
    const socket = socketIOClient(API_DEV_ENDPOINT);

    socket.on(
      "CityBike",
      (data?: {
        location: {
          latitude: number;
          longitude: number;
        };
        stations: IStation[];
      }) => {
        if (!data) {
          return;
        }

        if (data.location?.latitude && data.location?.longitude) {
          setMapState({
            ...mapState,
            position: [data.location.latitude, data.location.longitude],
          });
        }

        setStations(data.stations ?? []);

        // Use this setStations for showing demo of changing bike count
        // setStations(
        //   data.stations.map((station, i) => ({
        //     ...station,
        //     free_bikes:
        //       i % 2 === 0 ? Math.floor(Math.random() * 11) : station.free_bikes,
        //   })) ?? []
        // );
      }
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <CityBikeContext.Provider
      value={{
        mapState,
        stations,
      }}
    >
      {children}
    </CityBikeContext.Provider>
  );
};

const useCityBike = (): ICityBikeContext | undefined =>
  useContext<ICityBikeContext | undefined>(CityBikeContext);

export { CityBikeContextProvider, useCityBike };
