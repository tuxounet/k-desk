import { DataStoreContextType } from "../../../contexts/datastore";

import { IDataStore } from "../../../contexts/datastore/types/IDataStore";
import { ITopic } from "../../../contexts/datastore/types/ITopic";

export default async function createTopicOperation(
  newTopic: ITopic,
  storeContext: DataStoreContextType
): Promise<boolean> {
  const newStore: IDataStore = {
    ...storeContext.store,
  };

  const found = newStore.topics.items.find(
    (item) =>
      item.title.toLowerCase().trim() === newTopic.title.toLowerCase().trim()
  );
  if (found) {
    throw new Error("un topic avec le même nom est déjà présent");
  }
  newStore.events.items.push({
    sequence: newStore.events.lastSequence + 1,
    date: new Date(),
    event: "CREATED",
    label: "création du sujet ",
  });
  newStore.events.lastSequence = newStore.events.lastSequence + 1;
  newStore.topics.items.push(newTopic);
  newStore.topics.lastSequence = newTopic.sequence;
  return await storeContext.save(newStore);
}
