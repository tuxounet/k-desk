import {
  DataStoreContext,
  DataStoreContextType,
} from "../../../contexts/datastore";
import { IDataNode } from "../../../contexts/datastore/types/IDataNode";
import { KindContext, KindContextType } from "../../../contexts/kinds";
import React from "react";

interface LinkToNodeProps {
  sequence: number;
}

export default function LinkToNode({ sequence }: LinkToNodeProps) {
  const kindContext = React.useContext(KindContext) as KindContextType;
  const storeContext = React.useContext(
    DataStoreContext
  ) as DataStoreContextType;
  const [node, setNode] = React.useState<IDataNode>();

  React.useEffect(() => {
    setNode(undefined);
    const found = storeContext.store.nodes.items.find(
      (item) => item.sequence === sequence
    );

    setNode(found);
  }, [sequence]);

  const onGoNode = () => {
    kindContext.setData(sequence);
    kindContext.setAction("detail");
    kindContext.setCurrent("nodes");
  };
  return (
    <>
      {!node && <></>}
      {node && (
        <>
          <a onClick={onGoNode}>
            #{node.sequence}{" "}
            {node && (
              <span>
                {node.title} ({node.status})
              </span>
            )}
          </a>
        </>
      )}
    </>
  );
}
