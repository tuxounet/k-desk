import { DataStoreContextType } from "../../../contexts/datastore";
import { IDataNode } from "../../../contexts/datastore/types/IDataNode";

import { IDataStore } from "../../../contexts/datastore/types/IDataStore";

export default async function updateNodeOperation(
  updatedNode: IDataNode,
  storeContext: DataStoreContextType
): Promise<boolean> {
  const newStore: IDataStore = {
    ...storeContext.store,
  };
  newStore.updatedAt = new Date();
  const index = newStore.nodes.items.findIndex(
    (item) => item.sequence === updatedNode.sequence
  );

  newStore.nodes.items[index] = updatedNode;
  updatedNode.updatedAt = new Date();
  newStore.events.items.push({
    sequence: newStore.events.lastSequence + 1,
    date: new Date(),
    event: "NODE_UPDATED",
    label: "modification de l'élément " + updatedNode.sequence,
  });
  newStore.events.lastSequence = newStore.events.lastSequence + 1;

  return await storeContext.save(newStore);
}
