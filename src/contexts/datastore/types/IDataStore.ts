import { IDataNode } from "./IDataNode";
import { IEvent } from "./IEvent";

export interface IDataStore {
  version: string;
  createdAt: Date;
  updatedAt: Date;

  nodes: {
    lastSequence: number;
    items: IDataNode[];
  };
  events: {
    lastSequence: number;
    items: IEvent[];
  };
}

export const defaultDataStore: IDataStore = {
  version: "v0",
  createdAt: new Date(),
  updatedAt: new Date(),
  nodes: {
    lastSequence: 0,
    items: [],
  },
  events: {
    lastSequence: 0,
    items: [],
  },
};
