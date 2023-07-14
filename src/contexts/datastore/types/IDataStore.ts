import { IElement } from "./IElement";
import { IEvent } from "./IEvent";
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
  events: {
    lastSequence: number;
    items: IEvent[];
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
  events: {
    lastSequence: 0,
    items: [],
  },
};
