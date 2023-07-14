import serializeFileOperation from "../../file/operations/serializeFile";
import { IDataStore } from "../types/IDataStore";

export default async function saveStoreOperation(
  handle: FileSystemFileHandle,
  store: IDataStore
): Promise<boolean> {
  const body = await serializeFileOperation(store);
  
  // create a FileSystemWritableFileStream to write to
  const writableStream = await handle.createWritable();
  // write our file
  await writableStream.write(body);

  // close the file and write the contents to disk.
  await writableStream.close();
  return true;
}
