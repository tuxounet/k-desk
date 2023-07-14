import parseFileOperation from "../../file/operations/parseFile";
import serializeFileOperation from "../../file/operations/serializeFile";
import { IDataStore } from "../types/IDataStore";

export default async function loadStoreOperation(
  handle: FileSystemFileHandle
): Promise<IDataStore> {
  const file = await handle.getFile();
  const body = await file.text();
  const store = await parseFileOperation(body);

  const inboxTopic = store.nodes.items.find(
    (item) => item.kind === "group" && item.title === "inbox"
  );
  if (!inboxTopic) {
    store.nodes.items.push({
      sequence: store.nodes.lastSequence + 1,
      title: "inbox",
      createdAt: new Date(),
      updatedAt: new Date(),
      description: "",
      kind: "group",
      status: "ACTIVE",
    });
    store.nodes.lastSequence = store.nodes.lastSequence + 1;

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
