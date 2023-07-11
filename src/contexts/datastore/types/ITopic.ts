export interface ITopic {
  id: string;
  sequence: number;
  title: string;
  description: string;
  status: TopicStatus;
  createdAt: Date;
  updatedAt: Date;
  events: ITopicEvent[];
}

export interface ITopicEvent {
  event: string;
  label: string;
  date: Date;
}

export type TopicStatus = "ACTIVE" | "PENDING" | "COMPLETED";
