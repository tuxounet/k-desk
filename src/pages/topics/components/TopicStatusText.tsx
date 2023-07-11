import { TopicStatus } from "../../../contexts/datastore/types/ITopic";

interface TopicStatusTextProps {
  status?: TopicStatus;
}

export default function TopicStatusText(props: TopicStatusTextProps) {
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
