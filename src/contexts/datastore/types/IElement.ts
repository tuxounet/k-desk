export interface IElement {
  sequence: number;
  title: string;
  topic: number;
  status: ElementStatus;
  detail: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ElementStatus = "ACTIVE" | "PENDING" | "COMPLETED";
