import React from "react";
import AppBrand from "./components/AppBrand";
import openFileOperation from "./operations/openFile";
import createFileOperation from "./operations/createFile";

export type FileContextType = {
  readonly: boolean;
  fileHandle?: FileSystemFileHandle;
};

export const FileContext = React.createContext<FileContextType>({
  readonly: true,
  fileHandle: undefined,
});
interface FileContextProviderProps {
  children: JSX.Element;
}

export default function FileContextProvider(props: FileContextProviderProps) {
  const [error, setError] = React.useState<string>();
  const [fileHandle, setFileHandle] = React.useState<FileSystemFileHandle>();
  const [readonly] = React.useState(
    typeof window.showSaveFilePicker === "undefined"
  );
  const onIOActionError = (e: Error) => {
    if (e.name === "AbortError") return;
    console.error(e);
    setError(e.name + " - " + e.message || JSON.stringify(e, null));
  };

  return (
    <>
      <nav className="level is-mobile">
        <AppBrand />

        {!fileHandle && (
          <div className="level-right">
            {!readonly && (
              <p className="level-item">
                <button
                  className="button"
                  onClick={() => {
                    createFileOperation()
                      .then((handle) => setFileHandle(handle))
                      .catch((e: Error) => onIOActionError(e));
                  }}
                >
                  Nouveau
                </button>
              </p>
            )}
            <p className="level-item">
              <button
                className="button is-success"
                onClick={() => {
                  openFileOperation(readonly)
                    .then((handle) => setFileHandle(handle))
                    .catch((e: Error) => onIOActionError(e));
                }}
              >
                Ouvrir
              </button>
            </p>
          </div>
        )}
        {fileHandle && (
          <div className="level-right">
            <p className="level-item">
              <button
                className="button"
                onClick={() => {
                  setFileHandle(undefined);
                }}
              >
                Fermer
              </button>
            </p>
          </div>
        )}
      </nav>
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

      <FileContext.Provider value={{ fileHandle, readonly }}>
        {fileHandle && props.children}
      </FileContext.Provider>
    </>
  );
}
