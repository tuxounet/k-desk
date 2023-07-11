import { IActivity } from "./IActivity";
import { ITopic } from "./ITopic";

export interface IDataStore {
  topics: {
    lastSequence: number;
    items: ITopic[];
  };
  activities: {
    activities: {
      lastSequence: number;
      items: IActivity[];
    };
  };
}

export const defaultDataStore: IDataStore = {
  topics: {
    lastSequence: 0,
    items: [],
  },
  activities: {
    activities: {
      lastSequence: 0,
      items: [],
    },
  },
};
