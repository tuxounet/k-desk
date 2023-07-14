import { DataNodeStatus } from "../../../contexts/datastore/types/IDataNode";

interface NodeStatusTextProps {
  status?: DataNodeStatus;
}

export default function NodeStatusText(props: NodeStatusTextProps) {
  if (!props.status) return <>Tous</>;
  switch (props.status) {
    case "ACTIVE":
      return <>Actif</>;
    case "PENDING":
      return <>En attente</>;
    case "COMPLETED":
      return <>Terminé</>;

    default:
      return <>?</>;
  }
}
