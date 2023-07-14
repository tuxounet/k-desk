import React from "react";

import { DataStoreContext } from "../../../contexts/datastore";
import { FileContext } from "../../../contexts/file";
import { IDataNode } from "../../../contexts/datastore/types/IDataNode";

import NodeForm from "../components/NodeForm";
import updateNodeOperation from "../operations/updateNode";

interface NodeEditViewProps {
  item: IDataNode;
}

export default function NodeEditView({ item }: NodeEditViewProps) {
  const [error, setError] = React.useState<string>();
  const [initialValue, setInitialValue] = React.useState<IDataNode>();
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

  React.useEffect(() => {
    setInitialValue(item);
  }, [item, isActive]);

  const onFormSave = (updatedNode: IDataNode) => {
    setError(undefined);
    setInitialValue(updatedNode);

    updateNodeOperation(updatedNode, storeContext)
      .then(() => {
        setInitialValue(undefined);
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
          <a
            className="card-footer-item has-background-success-light"
            onClick={openModal}
          >
            Modifier
          </a>

          <div
            className={`modal ${isActive ? "is-active" : ""}`}
            id="topic-create-modal"
          >
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">
                  Modifier l'élément #{item.sequence}
                </p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={closeModal}
                ></button>
              </header>

              <section className="modal-card-body">
                <NodeForm
                  initialValue={initialValue}
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
