import { IDataStore } from "../../datastore/types/IDataStore";
import { load } from "js-yaml";

export default async function parseFileOperation(
  body: string
): Promise<IDataStore> {
  const result = load(body, undefined) as IDataStore;
  return result;
}
