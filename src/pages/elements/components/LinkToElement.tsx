import {
  DataStoreContext,
  DataStoreContextType,
} from "../../../contexts/datastore";
import { IElement } from "../../../contexts/datastore/types/IElement";
import { KindContext, KindContextType } from "../../../contexts/kinds";
import React from "react";

interface LinkToElementProps {
  sequence: number;
}

export default function LinkToElement({ sequence }: LinkToElementProps) {
  const kindContext = React.useContext(KindContext) as KindContextType;
  const storeContext = React.useContext(
    DataStoreContext
  ) as DataStoreContextType;
  const [element, setElement] = React.useState<IElement>();

  React.useEffect(() => {
    setElement(undefined);
    const found = storeContext.store.elements.items.find(
      (item) => item.sequence === sequence
    );

    setElement(found);
  }, [sequence]);

  const onGoElement = () => {
    kindContext.setData(sequence);
    kindContext.setCurrent("elements");
  };
  return (
    <a className="panel-block" onClick={onGoElement}>
      <span className="panel-icon">
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

      <span>
        #{sequence}{" "}
        {element && (
          <span>
            {element.title} ({element.status})
          </span>
        )}
      </span>
    </a>
  );
}
