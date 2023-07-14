import { DataStoreContextType } from "../../../contexts/datastore";
import { IDataNode } from "../../../contexts/datastore/types/IDataNode";

import { IDataStore } from "../../../contexts/datastore/types/IDataStore";

export default async function createNodeOperation(
  newNode: IDataNode,
  storeContext: DataStoreContextType
): Promise<boolean> {
  const newStore: IDataStore = {
    ...storeContext.store,
  };

  newNode.sequence = newStore.nodes.lastSequence + 1;
  newStore.nodes.items.push(newNode);
  newStore.nodes.lastSequence = newNode.sequence;
  newStore.events.items.push({
    sequence: newStore.events.lastSequence + 1,
    date: new Date(),
    event: "NODE_CREATED",
    label: "création de l'élément " + newStore.events.lastSequence + 1,
  });
  newStore.events.lastSequence = newStore.events.lastSequence + 1;

  return await storeContext.save(newStore);
}
