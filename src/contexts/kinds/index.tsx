import React from "react";

import TopicsPanel from "../../pages/topics";
import ElementsPanel from "../../pages/elements";
import MapPanel from "../../pages/map";

export type KindView = "map" | "topics" | "elements";
export type KindContextType = {
  current: KindView;
  setCurrent: (value: KindView) => void;
  data?: number;
  setData: (value: number | undefined) => void;
};

export const KindContext = React.createContext<KindContextType>({
  current: "map",
  setCurrent: () => {
    return;
  },
  data: undefined,
  setData: () => {
    return;
  },
});

export default function KindContextProvider() {
  const [current, setCurrent] = React.useState<KindView>("map");
  const [data, setData] = React.useState<number | undefined>();
  return (
    <KindContext.Provider value={{ current, setCurrent, data, setData }}>
      <nav className="panel">
        <p className="panel-tabs">
          <a
            className={current === "map" ? "is-active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setData(undefined);
              setCurrent("map");
            }}
          >
            Carte
          </a>
          <a
            className={current === "elements" ? "is-active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setData(undefined);
              setCurrent("elements");
            }}
          >
            Elements
          </a>
          <a
            className={current === "topics" ? "is-active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setData(undefined);
              setCurrent("topics");
            }}
          >
            Sujets
          </a>
        </p>
        {current === "map" && <MapPanel />}
        {current === "elements" && <ElementsPanel item={data} />}
        {current === "topics" && <TopicsPanel item={data} />}
      </nav>
    </KindContext.Provider>
  );
}
