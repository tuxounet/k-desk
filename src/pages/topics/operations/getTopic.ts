import { DataStoreContextType } from "../../../contexts/datastore";

import { ITopic } from "../../../contexts/datastore/types/ITopic";

export default async function getTopicOperation(
  sequence: number,
  storeContext: DataStoreContextType
): Promise<ITopic> {
  const found = storeContext.store.topics.items.find(
    (item) => item.sequence === sequence
  );
  if (!found) {
    throw new Error("sujet introuvable");
  }

  return found;
}
