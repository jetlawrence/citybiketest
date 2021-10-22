import { IStation } from "../types";
import socketIOClient from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import { API_DEV_ENDPOINT } from "../constants";

const MAX_HISTORY_LENGTH = 100;

type MapState = {
  position: [number, number];
  zoom: number;
};

export interface ICityBikeContext {
  mapState: MapState;
  stations: IStation[];
  onFastForward: () => void;
  onFastBackward: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onPlay: () => void;
  onPause: () => void;
  isPaused: boolean;
}

const CityBikeContext = createContext<ICityBikeContext | undefined>(undefined);

type CbHistoryItem = {
  timestamp: string;
  stations: IStation[];
};

const CityBikeContextProvider: React.FC = ({ children }) => {
  const [mapState, setMapState] = useState<MapState>({
    position: [25.790654, -80.1300455],
    zoom: 13,
  });
  const [history, setHistory] = useState<CbHistoryItem[]>([]);
  const [historyIndexOnView, setHistoryIndexOnView] = useState<number | null>(
    null
  );

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
          setMapState((mapState) => ({
            ...mapState,
            position: [data.location.latitude, data.location.longitude],
          }));
        }

        const stations = data?.stations ?? [];

        // Use this for showing demo of changing bike count
        // const stations = (data?.stations ?? []).map((station, i) => ({
        //   ...station,
        //   free_bikes:
        //     i % 2 === 0 ? Math.floor(Math.random() * 11) : station.free_bikes,
        //   timestamp: new Date().toISOString(),
        // }));
        // setStations(
        //   data.stations.map((station, i) => ({
        //     ...station,
        //     free_bikes:
        //       i % 2 === 0 ? Math.floor(Math.random() * 11) : station.free_bikes,
        //     timestamp: new Date().toISOString()
        //   })) ?? []
        // );

        const updateHistory = () =>
          setHistory((history) => {
            if (!stations.length) {
              return history;
            }

            const latestTimestamp = new Date(
              Math.max(
                ...stations.map((station) =>
                  station.timestamp ? new Date(station.timestamp).getTime() : 0
                )
              )
            ).toISOString();

            const latestHistoryItemTimestamp = history.length
              ? history[history.length - 1]
              : "";

            if (latestTimestamp !== latestHistoryItemTimestamp) {
              return [
                ...(history.length > MAX_HISTORY_LENGTH
                  ? history.slice(1, MAX_HISTORY_LENGTH)
                  : history),
                {
                  timestamp: latestTimestamp,
                  stations,
                },
              ].sort((h1, h2) => {
                const t1 = new Date(h1.timestamp);
                const t2 = new Date(h2.timestamp);

                return t1 < t2 ? -1 : t1 > t2 ? 1 : 0;
              });
            } else {
              return history;
            }
          });

        updateHistory();
      }
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  const onFastBackward = () => {
    if (history?.length) {
      setHistoryIndexOnView(0);
    }
  };

  const onFastForward = () => {
    if (history?.length) {
      setHistoryIndexOnView(history.length - 1);
    }
  };

  const onStepBackward = () => {
    if (!historyIndexOnView) {
      if (history.length) {
        setHistoryIndexOnView(Math.max(history.length - 2, 0));
      }
    } else {
      setHistoryIndexOnView(Math.max(historyIndexOnView - 1, 0));
    }
  };

  const onStepForward = () => {
    if (!historyIndexOnView) {
      if (history.length) {
        setHistoryIndexOnView(Math.max(history.length - 1, 0));
      }
    } else {
      setHistoryIndexOnView(
        Math.min(historyIndexOnView + 1, history.length - 1)
      );
    }
  };

  const onPlay = () => {
    setHistoryIndexOnView(null);
  };

  const onPause = () => {
    if (history.length) {
      setHistoryIndexOnView(history.length - 1);
    }
  };

  return (
    <CityBikeContext.Provider
      value={{
        mapState,
        stations:
          history?.[
            historyIndexOnView !== null
              ? historyIndexOnView
              : history.length - 1
          ]?.stations ?? [],
        onFastBackward,
        onFastForward,
        onStepBackward,
        onStepForward,
        onPlay,
        onPause,
        isPaused: historyIndexOnView !== null,
      }}
    >
      {children}
    </CityBikeContext.Provider>
  );
};

const useCityBike = (): ICityBikeContext | undefined =>
  useContext<ICityBikeContext | undefined>(CityBikeContext);

export { CityBikeContextProvider, useCityBike };
