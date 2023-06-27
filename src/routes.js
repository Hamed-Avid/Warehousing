import { Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewProductPage from "./pages/NewProductPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/newProduct/*", element: <NewProductPage /> },
  { path: "*", element: <Navigate to="/" /> },
];

export default routes;
