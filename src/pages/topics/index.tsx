import React from "react";
import TopicsStats from "./components/TopicsStats";
import { DataStoreContext } from "../../contexts/datastore";
import TopicsCreate from "./components/TopicCreate";
import TopicsList from "./components/TopicsList";
import { ITopic } from "../../contexts/datastore/types/ITopic";

export default function TopicsPanel() {
  const { store } = React.useContext(DataStoreContext);
  const [filter, setFilter] = React.useState<string>();
  const [status, setStatus] = React.useState<string>();
  const [topics, setTopics] = React.useState<ITopic[]>([]);
  React.useEffect(() => {
    let allTopics: ITopic[] = [];
    if (!status) {
      allTopics = store.topics;
    } else {
      allTopics = store.topics.filter((item) => item.status === status);
    }

    if (filter) {
      allTopics = allTopics.filter(
        (item) =>
          item.title.toLowerCase().includes(filter.toLowerCase()) ||
          item.description.toLowerCase().includes(filter.toLowerCase())
      );
    }
    setTopics(allTopics);
  }, [status, store, filter]);

  return (
    <>
      <p className="panel-heading">Sujets</p>
      <TopicsStats store={store} />
      <TopicsCreate />
      <p className="panel-tabs">
        <a
          className={status === undefined ? "is-active" : ""}
          onClick={() => setStatus(undefined)}
        >
          Tous
        </a>
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
      <TopicsList topics={topics} />
    </>
  );
}
