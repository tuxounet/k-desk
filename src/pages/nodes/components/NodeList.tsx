import { IDataNode } from "../../../contexts/datastore/types/IDataNode";
import NodeListItem from "./NodeListItem";
interface NodeListProps {
  nodes: IDataNode[];
}
export default function NodeList({ nodes }: NodeListProps) {
  return (
    <>
      {nodes.map((item) => (
        <NodeListItem node={item} key={item.sequence} />
      ))}
    </>
  );
}
