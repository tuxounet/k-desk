import React from "react";
import { DataStoreContext } from "../../../contexts/datastore";

import {
  DataNodeStatus,
  IDataNode,
} from "../../../contexts/datastore/types/IDataNode";
import NodeCreate from "../components/NodeCreate";
import NodeStats from "../components/NodeStats";
import NodeList from "../components/NodeList";

export default function NodeListView() {
  const { store } = React.useContext(DataStoreContext);
  const [filter, setFilter] = React.useState<string>();
  const [status, setStatus] = React.useState<DataNodeStatus | undefined>(
    "ACTIVE"
  );
  const [nodes, setNodes] = React.useState<IDataNode[]>([]);
  React.useEffect(() => {
    let allNodes: IDataNode[] = store.nodes.items || [];

    if (status) {
      allNodes = allNodes.filter((item) => item.status === status);
    }

    if (filter) {
      allNodes = allNodes.filter(
        (item) =>
          item.title.toLowerCase().includes(filter.toLowerCase()) ||
          item.description.toLowerCase().includes(filter.toLowerCase())
      );
    }
    allNodes.sort((a, b) => {
      return a.sequence > b.sequence ? 1 : -1;
    });
    setNodes(allNodes);
  }, [status, store, filter]);

  return (
    <>
      <p className="panel-heading">Sujets</p>
      <NodeCreate />
      <NodeStats nodes={store.nodes.items} />
      <p className="panel-tabs">
        <a
          className={status === "ACTIVE" ? "is-active" : ""}
          onClick={() => setStatus("ACTIVE")}
        >
          Actifs
        </a>
        <a
          className={status === "PENDING" ? "is-active" : ""}
          onClick={() => setStatus("PENDING")}
        >
          En attente
        </a>
        <a
          className={status === "COMPLETED" ? "is-active" : ""}
          onClick={() => setStatus("COMPLETED")}
        >
          Terminés
        </a>

        <a
          className={status === undefined ? "is-active" : ""}
          onClick={() => setStatus(undefined)}
        >
          Tous
        </a>
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="Filtrer"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <i className="icon is-left">
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
          </i>
        </p>
      </div>
      <NodeList nodes={nodes} />
    </>
  );
}
