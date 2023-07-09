import { IDataStore } from "../types/IDataStore";

export default async function loadStoreOperation(
  handle: FileSystemFileHandle
): Promise<IDataStore> {
  const file = await handle.getFile();
  const body = await file.text();
  const store = JSON.parse(body) as IDataStore;

  return store;
}
