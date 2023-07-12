import React from "react";

import moment from "moment";
import "moment/locale/fr";

import { IElement } from "../../../contexts/datastore/types/IElement";

interface ElementListItemProps {
  element: IElement;
}

export default function ElementListItem({ element }: ElementListItemProps) {
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
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span className="has-text-weight-bold ml-2">
            #{element.sequence} {element.title}
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
        <pre>{element.detail}</pre>
        <p>
          Sujet #{element.topic}
          <br />
          Crée le: {moment(element.createdAt).locale("fr").calendar()}
          <br />
          Dernière mise à jour:{" "}
          {moment(element.createdAt).locale("fr").calendar()}
        </p>
      </div>
    </div>
  );
}
