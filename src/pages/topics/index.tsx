import AllTopicsView from "./views/AllTopics";
import TopicDetailView from "./views/TopicDetail";
interface TopicsPanelProps {
  item?: number;
}
export default function TopicsPanel({ item }: TopicsPanelProps) {
  console.info(item);
  return (
    <>
      {item && <TopicDetailView item={item} />}
      {!item && <AllTopicsView />}
    </>
  );
}
