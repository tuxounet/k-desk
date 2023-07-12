import React from "react";

import TopicsPanel from "../../pages/topics";
import ElementsPanel from "../../pages/elements";

export type KindView = "activities" | "topics" | "elements";
export type KindContextType = {
  current: KindView;
  setCurrent: (value: KindView) => void;
};

export const KindContext = React.createContext<KindContextType>({
  current: "elements",
  setCurrent: () => {
    return;
  },
});

export default function KindContextProvider() {
  const [current, setCurrent] = React.useState<KindView>("elements");

  return (
    <KindContext.Provider value={{ current, setCurrent }}>
      <nav className="panel">
        <p className="panel-tabs">
          <a
            className={current === "activities" ? "is-active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setCurrent("activities");
            }}
          >
            Activités
          </a>
          <a
            className={current === "elements" ? "is-active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setCurrent("elements");
            }}
          >
            Elements
          </a>
          <a
            className={current === "topics" ? "is-active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setCurrent("topics");
            }}
          >
            Sujets
          </a>
        </p>

        {current === "elements" && <ElementsPanel />}
        {current === "topics" && <TopicsPanel />}
      </nav>
    </KindContext.Provider>
  );
}
