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

  const found = newStore.topics.find(
    (item) =>
      item.title.toLowerCase().trim() === newTopic.title.toLowerCase().trim()
  );
  if (found) {
    throw new Error("un topic avec le même nom est déjà présent");
  }
  newStore.topics.push(newTopic);
  return await storeContext.save(newStore);
}
