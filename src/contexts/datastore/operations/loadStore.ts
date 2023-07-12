import { IDataStore } from "../types/IDataStore";

export default async function loadStoreOperation(
  handle: FileSystemFileHandle
): Promise<IDataStore> {
  const file = await handle.getFile();
  const body = await file.text();
  const store = JSON.parse(body) as IDataStore;

  const inboxTopic = store.topics.items.find((item) => item.title === "inbox");
  if (!inboxTopic) {
    store.topics.items.push({
      sequence: store.topics.lastSequence + 1,
      title: "inbox",
      createdAt: new Date(),
      updatedAt: new Date(),
      description: "",
      elements: [],
      events: [],
      lastEventsSequence: 0,
      status: "ACTIVE",
    });
    store.topics.lastSequence = store.topics.lastSequence + 1;

    // create a FileSystemWritableFileStream to write to
    const writableStream = await handle.createWritable();

    // write our file
    await writableStream.write(JSON.stringify(store, null, 1));

    // close the file and write the contents to disk.
    await writableStream.close();
  }
  return store;
}
