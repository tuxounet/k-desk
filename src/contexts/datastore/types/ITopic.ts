export interface ITopic {
  sequence: number;
  title: string;
  description: string;
  status: TopicStatus;
  createdAt: Date;
  updatedAt: Date;
  elements: number[];
}

export type TopicStatus = "ACTIVE" | "PENDING" | "COMPLETED";
