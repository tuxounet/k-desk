export interface ITopic {
  sequence: number;
  title: string;
  description: string;
  status: TopicStatus;
  createdAt: Date;
  updatedAt: Date;
  events: ITopicEvent[];
  lastEventsSequence: number;
  elements: number[];
}

export interface ITopicEvent {
  sequence: number;
  event: string;
  label: string;
  date: Date;
}

export type TopicStatus = "ACTIVE" | "PENDING" | "COMPLETED";
