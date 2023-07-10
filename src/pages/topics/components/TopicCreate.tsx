import React from "react";
import createTopicOperation from "../operations/createTopic";
import { ITopic } from "../../../contexts/datastore/types/ITopic";
import { DataStoreContext } from "../../../contexts/datastore";
import { v4 } from "uuid";
import { FileContext } from "../../../contexts/file";
import constants from "../../../constants";
export default function TopicsCreate() {
  const [error, setError] = React.useState<string>();
  const [isActive, setIsActive] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState(constants.topics.LOWEST_PRIORITY);
  const storeContext = React.useContext(DataStoreContext);
  const { readonly } = React.useContext(FileContext);

  const openModal = () => {
    setIsActive(true);
  };
  const closeModal = () => {
    setError(undefined);
    setTitle("");
    setDescription("");
    setIsActive(false);
  };

  const onSave = () => {
    setError(undefined);
    const newTopic: ITopic = {
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ended: false,
      status: "ACTIVE",
      events: [],
      title,
      description,
      priority,
    };
    createTopicOperation(newTopic, storeContext)
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
              <span>Nouveau sujet</span>
            </button>
          </div>
          <div
            className={`modal ${isActive ? "is-active" : ""}`}
            id="topic-create-modal"
          >
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Nouveau sujet</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={closeModal}
                ></button>
              </header>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSave();
                }}
              >
                <section className="modal-card-body">
                  <div className="field">
                    <label className="label">Titre</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        required
                        name="title"
                        placeholder="nouveau-sujet-1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="textarea"
                        placeholder="description du nouveau sujet...."
                      ></textarea>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Priorité</label>
                    <div className="control">
                      <input
                        className="input"
                        type="number"
                        required
                        name="priority"
                        value={priority}
                        min={constants.topics.HIGHEST_PRIORITY}
                        max={constants.topics.LOWEST_PRIORITY}
                        onChange={(e) => setPriority(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
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

                <footer className="modal-card-foot">
                  <input
                    type="submit"
                    value={"Ajouter"}
                    className="button is-link"
                  />
                  <button
                    className="button  is-link is-light"
                    onClick={closeModal}
                  >
                    Annuler
                  </button>
                </footer>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
