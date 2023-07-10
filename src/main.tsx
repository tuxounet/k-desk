import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/open-sans";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/800.css";
import "bulma/css/bulma.min.css";
import "./index.css";
import FileContextProvider from "./contexts/file/index.tsx";
import DataStoreContextProvider from "./contexts/datastore/index.tsx";
import SPARouter from "./router.tsx";
import ServiceWorkerContextProvider from "./contexts/serviceworker/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ServiceWorkerContextProvider>
      <FileContextProvider>
        <DataStoreContextProvider>
          <SPARouter />
        </DataStoreContextProvider>
      </FileContextProvider>
    </ServiceWorkerContextProvider>
  </React.StrictMode>
);
