import { DataStoreContextType } from "../../../contexts/datastore";

import { IDataStore } from "../../../contexts/datastore/types/IDataStore";
import { IElement } from "../../../contexts/datastore/types/IElement";

export default async function createElementOperation(
  newElement: IElement,
  storeContext: DataStoreContextType
): Promise<boolean> {
  const newStore: IDataStore = {
    ...storeContext.store,
  };

  newStore.elements.items.push(newElement);
  newStore.elements.lastSequence = newElement.sequence;

  const elementTopic = newStore.topics.items.find(
    (item) => item.sequence === newElement.topic
  );
  if (elementTopic) {
    elementTopic.elements.push(newElement.sequence);
    newStore.events.items.push({
      sequence: newStore.events.lastSequence + 1,
      date: new Date(),
      event: "ADD",
      label: `l'element #${newElement.sequence} ajouté au sujet`,
    });
    newStore.events.lastSequence = newStore.events.lastSequence + 1;
  }
  return await storeContext.save(newStore);
}
