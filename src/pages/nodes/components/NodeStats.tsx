import React from "react";
import { IDataNode } from "../../../contexts/datastore/types/IDataNode";

interface DataStoreStatsProps {
  nodes: IDataNode[];
}

export default function NodeStats(props: DataStoreStatsProps) {
  const [all, setAll] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const [pending, setPending] = React.useState(0);

  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    setAll(props.nodes.length);
    setCompleted(props.nodes.filter((p) => p.status === "COMPLETED").length);
    setActive(props.nodes.filter((p) => p.status === "ACTIVE").length);
    setPending(props.nodes.filter((p) => p.status === "PENDING").length);
  }, [props.nodes]);

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
