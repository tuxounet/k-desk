import React from "react";
import NodesPanel from "../../pages/nodes";
import MapPanel from "../../pages/map";

export type KindView = "map" | "nodes";
export type KindAction = "list" | "detail" | "edit";
export type KindContextType = {
  current: KindView;
  setCurrent: (value: KindView) => void;
  data?: number;
  setData: (value: number | undefined) => void;
  action: KindAction;
  setAction: (value: KindAction) => void;
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
  action: "list",
  setAction: () => {
    return;
  },
});

export default function KindContextProvider() {
  const [current, setCurrent] = React.useState<KindView>("map");
  const [data, setData] = React.useState<number | undefined>();
  const [action, setAction] = React.useState<KindAction>("list");
  return (
    <KindContext.Provider
      value={{ current, setCurrent, data, setData, action, setAction }}
    >
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
            className={current === "nodes" ? "is-active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setData(undefined);
              setCurrent("nodes");
            }}
          >
            Elements
          </a>
        </p>
        {current === "map" && <MapPanel />}
        {current === "nodes" && <NodesPanel item={data} />}
      </nav>
    </KindContext.Provider>
  );
}
