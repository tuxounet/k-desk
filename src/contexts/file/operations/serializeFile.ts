import { IDataStore } from "../../datastore/types/IDataStore";
import { dump } from "js-yaml";
export default async function serializeFileOperation(
  store: IDataStore
): Promise<string> {
  return dump(store, {
    indent: 1,
    lineWidth: 1024,
    sortKeys: true,
  });
}
