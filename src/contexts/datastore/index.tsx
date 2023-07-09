import React from "react";

import { FileContext } from "../file";
import loadStoreOperation from "./operations/loadStore";
import { IDataStore } from "./types/IDataStore";
import saveStoreOperation from "./operations/saveStore";

export type DataStoreContextType = {
  store: IDataStore;
  reload: () => Promise<boolean>;
  save: (updatedStore: IDataStore) => Promise<boolean>;
};

export const DataStoreContext = React.createContext<DataStoreContextType>({
  store: {
    topics: [],
    activities: [],
  },
  reload: () => Promise.resolve(false),
  save: () => Promise.resolve(false),
});

interface DataStoreContextProviderProps {
  children: JSX.Element;
}

export default function DataStoreContextProvider(
  props: DataStoreContextProviderProps
) {
  const { fileHandle } = React.useContext(FileContext);
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState<string>();
  const [store, setStore] = React.useState<IDataStore>({
    topics: [],
    activities: [],
  });
  React.useEffect(() => {
    if (!fileHandle) return;
    reloadStore().catch((e: Error) => {
      console.error(e);
    });
  }, [fileHandle]);

  const reloadStore = () => {
    if (!fileHandle) {
      setError("handle not found");

      setReady(false);
      return Promise.resolve(false);
    }
    setError(undefined);
    return loadStoreOperation(fileHandle)
      .then((store) => {
        setStore(store);
        setReady(true);
        return true;
      })
      .catch((e: Error) => {
        setReady(false);
        setError(e.name + " - " + e.message);
        console.error(e);
        return false;
      });
  };

  const saveStore = (updatedStore: IDataStore) => {
    if (!fileHandle) {
      setError("handle not found");

      setReady(false);
      return Promise.resolve(false);
    }
    return saveStoreOperation(fileHandle, updatedStore)
      .then((result) => {
        setStore(updatedStore);
        setReady(result);
        return result;
      })
      .catch((e: Error) => {
        setReady(false);
        setError(e.name + " - " + e.message);
        console.error(e);
        return false;
      });
  };

  return (
    <>
      {!ready && fileHandle && (
        <progress className="progress is-small is-primary" max="100"></progress>
      )}
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
      {ready && !error && (
        <DataStoreContext.Provider
          value={{ store, reload: reloadStore, save: saveStore }}
        >
          {props.children}
        </DataStoreContext.Provider>
      )}
    </>
  );
}
