import React from "react";

import { DataStoreContext } from "../../../contexts/datastore";

import { ITopic } from "../../../contexts/datastore/types/ITopic";
import { KindContext } from "../../../contexts/kinds";

interface TopicDetailViewProps {
  item?: number;
}
export default function TopicDetailView({ item }: TopicDetailViewProps) {
  const { store } = React.useContext(DataStoreContext);
  const { setData } = React.useContext(KindContext);

  const [topic, setTopic] = React.useState<ITopic>();
  React.useEffect(() => {
    let allTopics: ITopic[] = store.topics.items || [];
    console.dir(item);
    if (item) {
      const topic = allTopics.find((e) => e.sequence === item);
      if (topic) {
        setTopic(topic);
        return;
      } else {
        setTopic(undefined);
      }
    }
  }, [store, item]);

  return (
    <>
      {topic && (
        <p className="panel-heading">
          Sujet #{topic.sequence}
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
