import React from "react";

import { DataStoreContext } from "../../../contexts/datastore";

import { FileContext } from "../../../contexts/file";
import { IElement } from "../../../contexts/datastore/types/IElement";
import createElementOperation from "../operations/createElement";
import getTopicOperation from "../../topics/operations/getTopic";
import { ITopic } from "../../../contexts/datastore/types/ITopic";
export default function ElementCreate() {
  const [error, setError] = React.useState<string>();
  const [isActive, setIsActive] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [topic, setTopic] = React.useState<number>();
  const storeContext = React.useContext(DataStoreContext);
  const { readonly } = React.useContext(FileContext);

  React.useEffect(() => {
    if (!isActive) return;

    const inboxTopic = storeContext.store.topics.items.find((item) => {
      item.title === "inbox";
    });
    if (inboxTopic) setTopic(inboxTopic.sequence);
  }, [isActive]);
  const openModal = () => {
    setIsActive(true);
  };
  const closeModal = () => {
    setError(undefined);
    setTitle("");
    setDetail("");
    setIsActive(false);
  };

  const onSave = async () => {
    setError(undefined);
    try {
      let targetTopic: ITopic | undefined;
      if (topic) {
        targetTopic = await getTopicOperation(topic, storeContext);
      } else
        targetTopic = storeContext.store.topics.items.find((item) => {
          item.title === "inbox";
        });
      const newElement: IElement = {
        sequence: storeContext.store.elements.lastSequence + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "ACTIVE",
        topic: targetTopic?.sequence ?? 1,
        title,
        detail,
      };
      await createElementOperation(newElement, storeContext);

      closeModal();
    } catch (e: any) {
      console.error(e);
      setError(e.name + "-" + e.message);
    }
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSave();
                  return false;
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
                        placeholder="nouvel-element-1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <textarea
                        name="detail"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        className="textarea"
                        placeholder="détail de l'élément...."
                      ></textarea>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Sujet</label>
                    <div className="control">
                      <div className="select">
                        <select
                          value={topic}
                          onChange={(e) => setTopic(parseInt(e.target.value))}
                        >
                          {storeContext.store.topics.items.map((item) => (
                            <option key={item.sequence} value={item.sequence}>
                              {item.title}
                            </option>
                          ))}
                        </select>
                      </div>
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
