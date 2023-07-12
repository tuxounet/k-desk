
import TopicItem from "./TopicItem";
import { ITopic } from "../../../contexts/datastore/types/ITopic";
interface TopicsListProps {
  topics: ITopic[];
  
}
export default function TopicsList({ topics }: TopicsListProps) {
  return (
    <>
      {topics.map((item) => (
        <TopicItem topic={item} key={item.sequence} />
      ))}
    </>
  );
}
