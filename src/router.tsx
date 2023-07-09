import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ActivitiesPage from "./pages/activities";
import TopicsPage from "./pages/topics";
import TopicDetailPage from "./pages/topic";

import { useRouteError } from "react-router-dom";
import constants from "./constants";

function ErrorRoute() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <article className="message is-danger">
      <div className="message-header">
        <p>Une erreur s'est produite lors de la navigationn</p>
      </div>
      <div className="message-body">
        <p className="is-family-monospace">
          {error.statusText || error.message}
        </p>
      </div>
      <div className="message-footer">
        <button className="button is-danger is-fullwidth" onClick={() => window.location.reload()}>Recharger</button>
      </div>
    </article>
  );
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ActivitiesPage />,
      errorElement: <ErrorRoute />,
    },
    {
      path: "/topics",
      element: <TopicsPage />,
      errorElement: <ErrorRoute />,
    },
    {
      path: "/topics/:id",
      element: <TopicDetailPage />,
      errorElement: <ErrorRoute />,
    },
  ],
  { basename: constants.BASE_ROUTE }
);

export default function SPARouter() {
  return <RouterProvider router={router} />;
}
