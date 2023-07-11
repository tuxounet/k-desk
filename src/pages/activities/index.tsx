import React from "react";
import ActivitiesList from "./components/ActivityList";
import { IActivity } from "../../contexts/datastore/types/IActivity";
import { DataStoreContext } from "../../contexts/datastore";

export default function ActivitiesPanel() {
  const { store } = React.useContext(DataStoreContext);
  const [activites, setActiities] = React.useState<IActivity[]>([]);
  React.useEffect(() => {
    let allActivities: IActivity[] = [];

    allActivities = store.activities.items || [];

    allActivities.sort((a, b) => {
      return a.sequence > b.sequence ? 1 : -1;
    });
    setActiities(allActivities);
  }, [store]);
  return (
    <>
      <p className="panel-heading">Activités</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input" type="text" placeholder="Search" />
          <span className="icon is-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </span>
        </p>
      </div>

      <ActivitiesList activities={activites} />
    </>
  );
}
