import { IActivity } from "../../../contexts/datastore/types/IActivity";
import ActivityListItem from "./ActivityListItem";
interface ActivitiesListProps {
  activities: IActivity[];
}
export default function ActivitiesList({ activities }: ActivitiesListProps) {
  return (
    <>
      {activities.map((item) => (
        <ActivityListItem activity={item} key={item.id} />
      ))}
    </>
  );
}
