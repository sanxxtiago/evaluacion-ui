import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout"
import { Home } from "./components/homepage/Home";
import { Users } from "./components/2pruebas/UsersPage"
import { FittsModelPage } from "./components/3modelos/FittsModelPage";
import { Subjective } from "./components/5subjetiva/Subjective";
import { HeuristicsEvaluatePage, HeuristicsIntroPage, HeuristicsLayout, HeuristicsSummaryPage } from "./components/1heuristica/HeuristicsModule";
import CognitiveDashboard from "./components/4recorridos/cognitive/CognitiveDashboard";

import Task1Page from "./components/4recorridos/cognitive/Task1Page";
import Task2Page from "./components/4recorridos/cognitive/Task2Page";
import Task3Page from "./components/4recorridos/cognitive/Task3Page";
import Summary from "./components/4recorridos/cognitive/Summary";
import FeedbackPage from "./components/4recorridos/cognitive/FeedbackPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "heuristics",
        element: <HeuristicsLayout />,
        children: [
          { index: true, element: <HeuristicsIntroPage /> },
          { path: "evaluate", element: <HeuristicsEvaluatePage /> },
          { path: "summary", element: <HeuristicsSummaryPage /> },
        ],
      },

      { path: "users", element: <Users /> },
      { path: "models", element: <FittsModelPage /> },

      {
        path: "roads/cognitivo",
        element: <CognitiveDashboard />,
        children: [
          { path: "t1", element: <Task1Page /> },
          { path: "t2", element: <Task2Page /> },
          { path: "t3", element: <Task3Page /> },
          { path: "summary", element: <Summary /> },
          { path: "feedback/:id", element: <FeedbackPage /> },
        ],
      },

      { path: "subjective", element: <Subjective /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
