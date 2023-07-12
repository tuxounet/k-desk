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
}

export const defaultDataStore: IDataStore = {
  topics: {
    lastSequence: 0,
    items: [],
  },

  elements: {
    lastSequence: 0,
    items: [],
  },
};
