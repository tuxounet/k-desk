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
    elementTopic.events.push({
      sequence: elementTopic.lastEventsSequence + 1,
      date: new Date(),
      event: "ADD",
      label: `l'element #${newElement.sequence} ajouté au sujet`,
    });
    elementTopic.lastEventsSequence = elementTopic.lastEventsSequence + 1;
  }
  return await storeContext.save(newStore);
}
