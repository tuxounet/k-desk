import React from "react";

import { DataStoreContext } from "../../contexts/datastore";
import StoreMap from "./components/StoreMap";
import { IElement } from "../../contexts/datastore/types/IElement";
import { ITopic } from "../../contexts/datastore/types/ITopic";

export default function MapPanel() {
  const { store } = React.useContext(DataStoreContext);
  const [elements, setElements] = React.useState<IElement[]>([]);
  const [topics, setTopics] = React.useState<ITopic[]>([]);

  React.useEffect(() => {
    setElements(store.elements.items);
    setTopics(store.topics.items);
  }, [store]);
  return (
    <>
      <p className="panel-heading">Map</p>
      <StoreMap elements={elements} topics={topics} />
    </>
  );
}
