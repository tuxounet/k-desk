export interface IDataNode {
  sequence: number;
  kind: DataNodeKindTypes;
  parent?: number;
  childs?: IDataReference[];
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  status: DataNodeStatus;
}
export interface IDataReference {
  target: number;
  type: DataNodeKindTypes;
}
export type DataNodeKindTypes = "group" | "element";
export type DataNodeLinkTypes = "child" | "parent";
export type DataNodeStatus = "ACTIVE" | "PENDING" | "COMPLETED";
