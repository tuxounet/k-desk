import React from "react";
import { ITopic } from "../../../contexts/datastore/types/ITopic";

interface TopicItemProps {
  topic: ITopic;
}

export default function TopicItem({ topic }: TopicItemProps) {
  const [expanded, setIsExpanded] = React.useState(false);
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
            {topic.title} - {topic.status}
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
        <div className="content">
          Content goes here <small>Small text</small>
        </div>
      </div>
      <footer className={`card-footer ${!expanded ? "is-hidden" : ""}`}>
        <a href="#" className="card-footer-item">
          Save
        </a>
        <a href="#" className="card-footer-item">
          Edit
        </a>
        <a href="#" className="card-footer-item">
          Delete
        </a>
      </footer>
    </div>
  );
}
