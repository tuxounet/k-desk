import { DataStoreContextType } from "../../../contexts/datastore";
import {
  DataNodeStatus,
  IDataNode,
} from "../../../contexts/datastore/types/IDataNode";

import { IDataStore } from "../../../contexts/datastore/types/IDataStore";

export default async function changeNodeStatusOperation(
  node: IDataNode,
  newStatus: DataNodeStatus,
  storeContext: DataStoreContextType
): Promise<boolean> {
  const newStore: IDataStore = {
    ...storeContext.store,
  };
  newStore.updatedAt = new Date();

  const found = newStore.nodes.items.find(
    (item) => item.sequence === node.sequence
  );
  if (!found) {
    throw new Error("élément introuvable");
  }

  if (found.status !== newStatus) {
    newStore.events.items.push({
      sequence: newStore.events.lastSequence + 1,
      date: new Date(),
      event: "STATUS_CHANGED",
      label: `l'élément ${found.sequence} est passé de '${found.status}' à '${newStatus}'`,
    });
    newStore.events.lastSequence = newStore.events.lastSequence + 1;
    found.updatedAt = new Date();
  }
  found.status = newStatus;

  return await storeContext.save(newStore);
}
