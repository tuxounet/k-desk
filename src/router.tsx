import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ActivitiesPage from "./pages/activities";
import TopicsPage from "./pages/topics";
import TopicDetailPage from "./pages/topic";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ActivitiesPage />,
  },
  {
    path: "/topics",
    element: <TopicsPage />,
  },
  {
    path: "/topics/:id",
    element: <TopicDetailPage />,
  },
]);

export default function SPARouter() {
  return <RouterProvider router={router} />;
}
