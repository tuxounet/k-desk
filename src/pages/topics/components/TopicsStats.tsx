import React from "react";
import { IDataStore } from "../../../contexts/datastore/types/IDataStore";

interface DataStoreStatsProps {
  store: IDataStore;
}

export default function TopicsStats(props: DataStoreStatsProps) {
  const [all, setAll] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [pending, setPending] = React.useState(0);

  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    setAll(props.store.topics.length);
    setCompleted(
      props.store.topics.filter((p) => p.status === "COMPLETED").length
    );
    setActive(props.store.topics.filter((p) => p.status === "ACTIVE").length);
    setPending(props.store.topics.filter((p) => p.status === "PENDING").length);
  }, [props.store]);

  return (
    <nav className="level is-mobile">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Actifs</p>
          <p className="title">{active}</p>
        </div>
      </div>

      <div className="level-item has-text-centered">
        <div>
          <p className="heading">En attente</p>
          <p className="title">{pending}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Terminées</p>
          <p className="title">{completed}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Tous</p>
          <p className="title">{all}</p>
        </div>
      </div>
    </nav>
  );
}
