export interface ITopic {
  id: string;
  title: string;
  description: string;
  status: string;
  ended: boolean;
  createdAt: Date;
  updatedAt: Date;
  events: ITopicEvent[];
  priority: number;
}

export interface ITopicEvent {
  event: string;
  label: string;
  date: Date;
}
