import {
  DataStoreContext,
  DataStoreContextType,
} from "../../../contexts/datastore";
import { ITopic } from "../../../contexts/datastore/types/ITopic";
import { KindContext, KindContextType } from "../../../contexts/kinds";
import React from "react";

interface LinkToTopicProps {
  sequence: number;
}

export default function LinkToTopic({ sequence }: LinkToTopicProps) {
  const kindContext = React.useContext(KindContext) as KindContextType;
  const storeContext = React.useContext(
    DataStoreContext
  ) as DataStoreContextType;
  const [topic, setTopic] = React.useState<ITopic>();

  React.useEffect(() => {
    setTopic(undefined);
    const found = storeContext.store.topics.items.find(
      (item) => item.sequence === sequence
    );

    setTopic(found);
  }, [sequence]);

  const onGoTopic = () => {
    kindContext.setData(sequence);
    kindContext.setCurrent("topics");
  };
  return (
    <a onClick={onGoTopic}>
      #{sequence}{" "}
      {topic && (
        <span>
          {topic.title} ({topic.status})
        </span>
      )}
    </a>
  );
}
