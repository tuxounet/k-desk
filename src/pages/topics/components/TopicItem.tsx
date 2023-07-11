import React from "react";
import { ITopic, TopicStatus } from "../../../contexts/datastore/types/ITopic";
import changeTopicStatusOperation from "../operations/changeTopicStatus";
import {
  DataStoreContext,
  DataStoreContextType,
} from "../../../contexts/datastore";
import TopicStatusText from "./TopicStatusText";
import moment from "moment";
import "moment/locale/fr";

interface TopicItemProps {
  topic: ITopic;
}

export default function TopicItem({ topic }: TopicItemProps) {
  const [expanded, setIsExpanded] = React.useState(false);
  const storeContext = React.useContext(
    DataStoreContext
  ) as DataStoreContextType;

  const onChangeStatus = (newStatus: TopicStatus) => {
    changeTopicStatusOperation(topic, newStatus, storeContext);
  };
  return (
    <div className="card is-fullwidth">
      <header className="card-header">
        <a
          className="card-header-title"
          onClick={() => setIsExpanded(!expanded)}
        >
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
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </span>
          <span className="has-text-weight-bold ml-2">
            #{topic.sequence} {topic.title} (
            <TopicStatusText status={topic.status} />)
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
        <p>
          Description: {topic.description}
          <hr />
          Crée le: {moment(topic.createdAt).locale("fr").calendar()}
          <br />
          Dernière mise à jour:{" "}
          {moment(topic.createdAt).locale("fr").calendar()}
          <br />
          Durée : {moment(topic.createdAt).diff(topic.updatedAt, "day")}j
        </p>

        <div className="is-fullwidth has-text-centered is-size-4 mt-2 mb-2">
          Activités
        </div>

        <div className="panel-block is-active">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          bulma
        </div>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          marksheet
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          minireset.css
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          jgthms.github.io
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-code-branch" aria-hidden="true"></i>
          </span>
          daniellowtw/infboard
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-code-branch" aria-hidden="true"></i>
          </span>
          mojs
        </a>

        <div className="is-fullwidth has-text-centered is-size-4 mt-2 mb-2">
          Historique
        </div>

        {topic.events.map((item) => (
          <div key={item.date.toString()} className="panel-block">
            <span className="panel-icon">
              <i className="fas fa-book" aria-hidden="true"></i>
            </span>
            {moment(item.date).locale("fr").calendar()} {item.label}
          </div>
        ))}
      </div>
      <footer className={`card-footer ${!expanded ? "is-hidden" : ""}`}>
        {topic.status !== "COMPLETED" && (
          <>
            {topic.status === "ACTIVE" && (
              <a
                className="card-footer-item"
                onClick={() => {
                  onChangeStatus("PENDING");
                }}
              >
                Suspendre
              </a>
            )}
            {topic.status === "PENDING" && (
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
        {topic.status === "COMPLETED" && (
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
