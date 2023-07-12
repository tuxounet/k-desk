import { DataStoreContextType } from "../../../contexts/datastore";

import { IDataStore } from "../../../contexts/datastore/types/IDataStore";
import { ITopic, TopicStatus } from "../../../contexts/datastore/types/ITopic";

export default async function changeTopicStatusOperation(
  topic: ITopic,
  newStatus: TopicStatus,
  storeContext: DataStoreContextType
): Promise<boolean> {
  const newStore: IDataStore = {
    ...storeContext.store,
  };

  const found = newStore.topics.items.find((item) => item.sequence === topic.sequence);
  if (!found) {
    throw new Error("topic introuvable");
  }

  if (found.status !== newStatus) {
    found.events.push({
      sequence: found.lastEventsSequence + 1,
      date: new Date(),
      event: "STATUS_CHANGED",
      label: `le sujet est passé de '${found.status}' à '${newStatus}'`,
    });
    found.lastEventsSequence = found.lastEventsSequence + 1;
    found.updatedAt = new Date();
  }
  found.status = newStatus;

  return await storeContext.save(newStore);
}
