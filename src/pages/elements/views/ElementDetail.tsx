import React from "react";

import { DataStoreContext } from "../../../contexts/datastore";

import { KindContext } from "../../../contexts/kinds";
import { IElement } from "../../../contexts/datastore/types/IElement";

interface ElementDetailViewProps {
  item?: number;
}
export default function ElementDetailView({ item }: ElementDetailViewProps) {
  const { store } = React.useContext(DataStoreContext);
  const { setData } = React.useContext(KindContext);

  const [element, setElement] = React.useState<IElement>();
  React.useEffect(() => {
    let allElements: IElement[] = store.elements.items || [];

    if (item) {
      const element = allElements.find((e) => e.sequence === item);
      if (element) {
        setElement(element);
        return;
      } else {
        setElement(undefined);
      }
    }
  }, [store, item]);

  return (
    <>
      {element && (
        <p className="panel-heading">
          Element #{element.sequence}
          <button
            onClick={() => {
              setData(undefined);
            }}
          >
            X
          </button>
        </p>
      )}
    </>
  );
}
