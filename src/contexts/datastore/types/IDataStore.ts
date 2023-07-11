import { IActivity } from "./IActivity";
import { ITopic } from "./ITopic";

export interface IDataStore {
  topics: {
    lastSequence: number;
    items: ITopic[];
  };
  activities: {
    lastSequence: number;
    items: IActivity[];
  };
}

export const defaultDataStore: IDataStore = {
  topics: {
    lastSequence: 0,
    items: [],
  },
  activities: {
    lastSequence: 0,
    items: [],
  },
};
