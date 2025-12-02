import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout"
import { Home } from "./components/homepage/Home";
import { Users } from "./components/2pruebas/UsersPage"
import { FittsModelPage } from "./components/3modelos/FittsModelPage";
import { Subjective } from "./components/5subjetiva/Subjective";
import { HeuristicsEvaluatePage, HeuristicsIntroPage, HeuristicsLayout, HeuristicsSummaryPage } from "./components/1heuristica/HeuristicsModule";
import CognitiveDashboard from "./components/4recorridos/cognitive/CognitiveDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "heuristics", element: <HeuristicsLayout />,
        children: [
          { index: true, element: <HeuristicsIntroPage /> },
          { path: "evaluate", element: <HeuristicsEvaluatePage /> },
          { path: "summary", element: <HeuristicsSummaryPage /> },
        ],
      },
      { path: "users", element: <Users /> },
      { path: "models", element: <FittsModelPage /> },
      { path: "roads/cognitivo", element: <CognitiveDashboard /> },
      { path: "subjective", element: <Subjective /> },


    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
