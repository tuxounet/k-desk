export interface IActivity {
  id: string;
  sequence: number;
  title: string;
  status: string;
  ended: boolean;
  createdAt: Date;
  updatedAt: Date;
  events: IActivityEvent[];
}

export interface IActivityEvent {
  event: string;
  label: string;
  date: Date;
}
