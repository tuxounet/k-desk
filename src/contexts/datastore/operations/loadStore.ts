import parseFileOperation from "../../file/operations/parseFile";
import serializeFileOperation from "../../file/operations/serializeFile";
import { IDataStore } from "../types/IDataStore";

export default async function loadStoreOperation(
  handle: FileSystemFileHandle
): Promise<IDataStore> {
  const file = await handle.getFile();
  const body = await file.text();
  const store = await parseFileOperation(body);

  const inboxTopic = store.topics.items.find((item) => item.title === "inbox");
  if (!inboxTopic) {
    store.topics.items.push({
      sequence: store.topics.lastSequence + 1,
      title: "inbox",
      createdAt: new Date(),
      updatedAt: new Date(),
      description: "",
      elements: [],
      status: "ACTIVE",
    });
    store.topics.lastSequence = store.topics.lastSequence + 1;

    const newBody = await serializeFileOperation(store);
    // create a FileSystemWritableFileStream to write to
    const writableStream = await handle.createWritable();

    // write our file
    await writableStream.write(newBody);

    // close the file and write the contents to disk.
    await writableStream.close();
  }
  return store;
}
