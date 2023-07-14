import React from "react";

import { DataStoreContext } from "../../../contexts/datastore";
import { FileContext } from "../../../contexts/file";
import { IDataNode } from "../../../contexts/datastore/types/IDataNode";
import createNodeOperation from "../operations/createNode";
import NodeForm from "../components/NodeForm";
export default function NodeCreateView() {
  const [error, setError] = React.useState<string>();
  const [isActive, setIsActive] = React.useState(false);

  const storeContext = React.useContext(DataStoreContext);
  const { readonly } = React.useContext(FileContext);

  const openModal = () => {
    setIsActive(true);
  };
  const closeModal = () => {
    setError(undefined);

    setIsActive(false);
  };

  const onFormSave = (newNode: IDataNode) => {
    setError(undefined);

    createNodeOperation(newNode, storeContext)
      .then(() => {
        closeModal();
      })
      .catch((e: Error) => {
        console.error(e);
        setError(e.name + "-" + e.message);
      });
  };

  return (
    <>
      {!readonly && (
        <>
          <div className="panel-block">
            <button
              data-target="topic-create-modal"
              className="button is-link is-outlined is-fullwidth"
              onClick={openModal}
            >
              <i className="icon">
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </i>
              <span>Nouvel élément</span>
            </button>
          </div>
          <div
            className={`modal ${isActive ? "is-active" : ""}`}
            id="topic-create-modal"
          >
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Nouvel élément</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={closeModal}
                ></button>
              </header>

              <section className="modal-card-body">
                <NodeForm
                  initialValue={undefined}
                  onSave={onFormSave}
                  onCancel={closeModal}
                />

                {error && (
                  <article className="message is-danger">
                    <div className="message-header">
                      <p>Une erreur s'est produite</p>
                      <button
                        className="delete is-medium"
                        aria-label="delete"
                        onClick={() => setError(undefined)}
                      ></button>
                    </div>
                    <div className="message-body">
                      <p className="is-family-monospace">{error}</p>
                    </div>
                  </article>
                )}
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
}
