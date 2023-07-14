import React from "react";
import {
  DataNodeKindTypes,
  IDataNode,
} from "../../../contexts/datastore/types/IDataNode";
import constants from "../../../constants";

import {
  DataStoreContext,
  DataStoreContextType,
} from "../../../contexts/datastore";

export interface NodeFormProps {
  initialValue?: IDataNode;
  onSave: (value: IDataNode) => void;
  onCancel: () => void;
}

export default function NodeForm(props: NodeFormProps) {
  const [kind, setKind] = React.useState<DataNodeKindTypes>("element");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [parent, setParent] = React.useState(0);
  const [allParents, setAllParents] = React.useState<
    { label: string; sequence: number }[]
  >([]);
  const storeContext = React.useContext(
    DataStoreContext
  ) as DataStoreContextType;

  React.useEffect(() => {
    const parents = storeContext.store.nodes.items
      .filter((item) => item.kind === "group")
      .map((item) => {
        return {
          parent: item.parent,
          kind: item.kind,
          label: item.title,
          sequence: item.sequence,
        };
      });
    parents.sort((a, b) => {
      return a.sequence > b.sequence ? 1 : -1;
    });

    let current: number = 0;
    if (props.initialValue) {
      const found = parents.find(
        (item) => item.sequence === props.initialValue?.sequence
      );
      if (found) {
        current = found.sequence;
      }
    }
    if (current === 0) {
      const rootParent = parents.find(
        (item) => item.sequence === item.parent && item.kind === "group"
      );
      if (rootParent) {
        current = rootParent.sequence;
      }
    }
    setAllParents(parents);

    setKind(props.initialValue ? props.initialValue.kind : "element");
    setTitle(props.initialValue ? props.initialValue.title : "");
    setDescription(props.initialValue ? props.initialValue.description : "");
    setParent(props.initialValue ? props.initialValue.parent : current);
  }, [props.initialValue]);

  const onSubmitForm = () => {
    const newNode: IDataNode = {
      sequence: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: constants.INITIAL_NODE_STATUS,
      title,
      description,
      kind,
      parent,
    };

    props.onSave(newNode);
    onCloseForm();
  };

  const onCloseForm = () => {
    setKind("element");
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitForm();
        return false;
      }}
    >
      <div className="field">
        <label className="label">Type</label>
        <div className="control">
          <div className="select">
            <select
              name="kind"
              className="select"
              value={kind}
              required
              onChange={(e) => setKind(e.target.value as any)}
            >
              <option value="element">Elément</option>
              <option value="group">Groupe</option>
            </select>
          </div>
        </div>
      </div>
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
        <label className="label">Parent</label>
        <div className="control">
          <div className="select">
            <select
              value={parent}
              onChange={(e) => {
                setParent(parseInt(e.target.value));
              }}
            >
              {allParents.map((item) => (
                <option value={item.sequence} key={item.sequence}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
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
            placeholder="description du nouveau élément...."
          ></textarea>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <input type="submit" className="button is-link" value="Enregistrer" />
        </div>
        <div className="control">
          <button
            className="button is-link is-light"
            onClick={() => {
              props.onCancel();
              onCloseForm();
            }}
          >
            Annuler
          </button>
        </div>
      </div>
    </form>
  );
}
