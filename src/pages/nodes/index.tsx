import NodeListView from "./views/NodeList";
import NodeDetailView from "./views/NodeDetail";

interface GroupsPanelProps {
  item?: number;
}
export default function NodesPanel({ item }: GroupsPanelProps) {
  return (
    <>
      {item && <NodeDetailView item={item} />}
      {!item && <NodeListView />}
    </>
  );
}
