import React from "react";

import {
  DataStoreContext,
  DataStoreContextType,
} from "../../../contexts/datastore";
import moment from "moment";
import "moment/locale/fr";

import {
  DataNodeStatus,
  IDataNode,
} from "../../../contexts/datastore/types/IDataNode";
import changeNodeStatusOperation from "../operations/changeNodeStatus";
import NodeStatusText from "./NodeStatusText";
import NodeIcon from "./NodeIcon";

interface NodeListItemProps {
  node: IDataNode;
}

export default function NodeListItem({ node }: NodeListItemProps) {
  const [expanded, setIsExpanded] = React.useState(false);
  const storeContext = React.useContext(
    DataStoreContext
  ) as DataStoreContextType;

  const onChangeStatus = (newStatus: DataNodeStatus) => {
    changeNodeStatusOperation(node, newStatus, storeContext);
  };
  return (
    <div className="card is-fullwidth">
      <header className="card-header">
        <a
          className="card-header-title"
          onClick={() => setIsExpanded(!expanded)}
        >
          <span className="icon">
            <NodeIcon kind={node.kind} />
          </span>
          <span className="has-text-weight-semibold ml-2">
            #{node.sequence} {node.title} (
            <NodeStatusText status={node.status} />)
          </span>
        </a>
        <a className="card-header-icon card-toggle">
          {expanded && (
            <span className="icon">
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
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </span>
          )}
          {!expanded && (
            <span className="icon">
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
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          )}
        </a>
      </header>
      <div className={`card-content ${!expanded ? "is-hidden" : ""}`}>
        <p>Description: {node.description}</p>
        <hr />
        <p>
          Crée le: {moment(node.createdAt).locale("fr").calendar()}
          <br />
          Dernière mise à jour: {moment(node.createdAt).locale("fr").calendar()}
        </p>
        <hr />
        <div className="is-fullwidth has-text-centered is-size-4 mt-2 mb-2">
          Eléments associés
        </div>
        {/* 
        {topic.elements.map((item) => (
          <LinkToElement sequence={item} key={`#${item}`} />
        ))} */}
      </div>
      <footer className={`card-footer ${!expanded ? "is-hidden" : ""}`}>
        {node.status !== "COMPLETED" && (
          <>
            {node.status === "ACTIVE" && (
              <a
                className="card-footer-item"
                onClick={() => {
                  onChangeStatus("PENDING");
                }}
              >
                Suspendre
              </a>
            )}
            {node.status === "PENDING" && (
              <a
                className="card-footer-item"
                onClick={() => {
                  onChangeStatus("ACTIVE");
                }}
              >
                Reprendre
              </a>
            )}
            <a
              className="card-footer-item"
              onClick={() => {
                onChangeStatus("COMPLETED");
              }}
            >
              Terminer
            </a>
          </>
        )}
        {node.status === "COMPLETED" && (
          <>
            <a
              className="card-footer-item"
              onClick={() => {
                onChangeStatus("ACTIVE");
              }}
            >
              Réactiver
            </a>
          </>
        )}
      </footer>
    </div>
  );
}
