import React from "react";

import { registerSW } from "virtual:pwa-register";

export type ServiceContextType = {
  updateReady: boolean;
};

export const ServiceContext = React.createContext<ServiceContextType>({
  updateReady: false,
});
interface ServiceWorkerContextProviderProps {
  children: JSX.Element;
}

export default function ServiceWorkerContextProvider(
  props: ServiceWorkerContextProviderProps
) {
  const [updateReady, setUpdateReady] = React.useState(false);
  React.useEffect(() => {
    registerSW({
      onNeedRefresh() {
        setUpdateReady(true);
      },
    });
  }, []);

  return (
    <ServiceContext.Provider value={{ updateReady }}>
      {updateReady && (
        <article className="message is-success">
          <div className="message-body">
            Une mise à jour est disponible
            <br />
            <a onClick={() => window.location.reload()}>Installer</a>
          </div>
        </article>
      )}
      {props.children}
    </ServiceContext.Provider>
  );
}
