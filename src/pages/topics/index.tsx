import AllTopicsView from "./views/AllTopics";
import TopicDetailView from "./views/TopicDetail";
interface TopicsPanelProps {
  item?: number;
}
export default function TopicsPanel({ item }: TopicsPanelProps) {
  return (
    <>
      {item && <TopicDetailView item={item} />}
      {!item && <AllTopicsView />}
    </>
  );
}
