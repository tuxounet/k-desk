import React from "react";

import { DataStoreContext } from "../../../contexts/datastore";

import { KindContext } from "../../../contexts/kinds";
import { IDataNode } from "../../../contexts/datastore/types/IDataNode";

interface NodeDetailViewProps {
  item?: number;
}
export default function NodeDetailView({ item }: NodeDetailViewProps) {
  const { store } = React.useContext(DataStoreContext);
  const { setData } = React.useContext(KindContext);

  const [node, setNode] = React.useState<IDataNode>();
  React.useEffect(() => {
    let allNodes: IDataNode[] = store.nodes.items || [];

    if (item) {
      const found = allNodes.find((e) => e.sequence === item);
      if (found) {
        setNode(found);
        return;
      } else {
        setNode(undefined);
      }
    }
  }, [store, item]);

  return (
    <>
      {node && (
        <p className="panel-heading">
          #{node.sequence} ({node.kind})
          <button
            onClick={() => {
              setData(undefined);
            }}
          >
            X
          </button>
        </p>
      )}
    </>
  );
}
