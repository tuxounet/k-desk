import React from "react";

import { DataStoreContext } from "../../contexts/datastore";
import StoreMap from "./components/StoreMap";

import { IDataNode } from "../../contexts/datastore/types/IDataNode";

export default function MapPanel() {
  const { store } = React.useContext(DataStoreContext);
  const [nodes, setNodes] = React.useState<IDataNode[]>([]);

  React.useEffect(() => {
    setNodes(store.nodes.items);
  }, [store]);
  return (
    <>
      <p className="panel-heading">Map</p>
      <StoreMap data={nodes} />
    </>
  );
}
