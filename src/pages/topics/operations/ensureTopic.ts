import { DataStoreContextType } from "../../../contexts/datastore";

import { IDataStore } from "../../../contexts/datastore/types/IDataStore";
import { ITopic } from "../../../contexts/datastore/types/ITopic";

export default async function ensureTopicOperation(
  title: string,
  storeContext: DataStoreContextType
): Promise<ITopic> {
  const found = storeContext.store.topics.items.find(
    (item) => item.title.toLowerCase().trim() === title.toLowerCase().trim()
  );
  if (found) {
    return found;
  }
  const newStore: IDataStore = {
    ...storeContext.store,
  };
  const newTopic: ITopic = {
    sequence: storeContext.store.topics.lastSequence + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "",
    title: title,
    elements: [],

    status: "ACTIVE",
    lastEventsSequence: 1,
    events: [
      {
        sequence: 1,
        date: new Date(),
        event: "CREATED",
        label: "création du sujet",
      },
    ],
  };
  newStore.topics.items.push(newTopic);
  newStore.topics.lastSequence = newTopic.sequence;
  await storeContext.save(newStore);

  return newTopic;
}
