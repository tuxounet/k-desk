import { IDataStore } from "../types/IDataStore";

export default async function saveStoreOperation(
  handle: FileSystemFileHandle,
  store: IDataStore
): Promise<boolean> {
  // create a FileSystemWritableFileStream to write to
  const writableStream = await handle.createWritable();

  // write our file
  await writableStream.write(JSON.stringify(store, null, 1));

  // close the file and write the contents to disk.
  await writableStream.close();
  return true;
}
