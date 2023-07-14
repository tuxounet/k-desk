import React from "react";
import {
  DataNodeKindTypes,
  IDataNode,
} from "../../../contexts/datastore/types/IDataNode";

export interface NodeFormProps {
  initialValue?: IDataNode;
  onSave: (value: IDataNode) => void;
  onCancel: () => void;
}

export default function NodeForm(props: NodeFormProps) {
  const [kind, setKind] = React.useState<DataNodeKindTypes>("element");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setKind(props.initialValue ? props.initialValue.kind : "element");
    setTitle(props.initialValue ? props.initialValue.title : "");
    setDescription(props.initialValue ? props.initialValue.description : "");
  }, [props.initialValue]);

  const onSubmitForm = () => {
    const newNode: IDataNode = {
      sequence: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "ACTIVE",
      title,
      description,
      kind,
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
