import React from "react";
import { DataStoreContext } from "../../contexts/datastore";
import { IElement } from "../../contexts/datastore/types/IElement";
import ElementList from "./components/ElementList";
import ElementCreate from "./components/ElementCreate";

interface ElementsPanelProps {
  item?: number;
}

export default function ElementsPanel({ item }: ElementsPanelProps) {
  const { store } = React.useContext(DataStoreContext);
  const [elements, setElements] = React.useState<IElement[]>([]);
  React.useEffect(() => {
    let allElements: IElement[] = [];

    allElements = store.elements.items || [];

    allElements.sort((a, b) => {
      return a.sequence > b.sequence ? 1 : -1;
    });
    setElements(allElements);
  }, [store]);
  return (
    <>
      <p className="panel-heading">Eléments</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input className="input" type="text" placeholder="Search" />
          <span className="icon is-left">
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
          </span>
        </p>
      </div>
      <ElementCreate />
      <ElementList elements={elements} selected={item} />
    </>
  );
}
