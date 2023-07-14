import React from "react";

import NodeStatusText from "./NodeStatusText";
import NodeIcon from "./NodeIcon";
import { KindContext, KindContextType } from "../../../contexts/kinds";
import { IDataNode } from "../../../contexts/datastore/types/IDataNode";

interface NodeListItemProps {
  node: IDataNode;
}

export default function NodeListItem({ node }: NodeListItemProps) {
  const kindContext = React.useContext(KindContext) as KindContextType;

  const onNodeClick = () => {
    kindContext.setData(node.sequence);
    kindContext.setCurrent("nodes");
  };
  return (
    <a className="panel-block" onClick={onNodeClick}>
      <span className="panel-icon">
        <NodeIcon kind={node.kind} />
      </span>
      #{node.sequence} {node.title} (
      <NodeStatusText status={node.status} />)
    </a>
  );
}
