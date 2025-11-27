import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout"
import { Home } from "./components/homepage/Home";
import { Heuristics } from "./components/1heuristica/Heuristics";
import { Users } from "./components/2pruebas/UsersPage"
import { FittsModelPage } from "./components/3modelos/FittsModelPage";
import { Roads } from "./components/4recorridos/Roads";
import { Subjective } from "./components/5subjetiva/Subjective";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "heuristics", element: <Heuristics /> },
      { path: "users", element: <Users /> },
      { path: "models", element: <FittsModelPage /> },
      { path: "roads", element: <Roads /> },
      { path: "subjective", element: <Subjective /> }

    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
