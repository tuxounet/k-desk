import { IElement } from "./IElement";
import { ITopic } from "./ITopic";

export interface IDataStore {
  version: string;
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
  version: "v0",
  topics: {
    lastSequence: 0,
    items: [],
  },

  elements: {
    lastSequence: 0,
    items: [],
  },
};
