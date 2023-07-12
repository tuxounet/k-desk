import { IActivity } from "./IActivity";
import { IElement } from "./IElement";
import { ITopic } from "./ITopic";

export interface IDataStore {
  topics: {
    lastSequence: number;
    items: ITopic[];
  };
  elements: {
    lastSequence: number;
    items: IElement[];
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
  elements: {
    lastSequence: 0,
    items: [],
  },
};
