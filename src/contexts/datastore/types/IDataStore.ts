import { IActivity } from "./IActivity";
import { ITopic } from "./ITopic";

export interface IDataStore {
  topics: ITopic[];
  activities: IActivity[];
}
