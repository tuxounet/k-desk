import React from "react";

import ActivitiesPanel from "../../pages/activities";
import TopicsPanel from "../../pages/topics";

export type KindView = "activities" | "topics";
export type KindContextType = {
  current: KindView;
  setCurrent: (value: KindView) => void;
};

export const KindContext = React.createContext<KindContextType>({
  current: "activities",
  setCurrent: () => {
    return;
  },
});

export default function KindContextProvider() {
  const [current, setCurrent] = React.useState<KindView>("activities");

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
            className={current === "topics" ? "is-active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setCurrent("topics");
            }}
          >
            Sujets
          </a>
        </p>

        {current === "activities" && <ActivitiesPanel />}
        {current === "topics" && <TopicsPanel />}
      </nav>
    </KindContext.Provider>
  );
}
