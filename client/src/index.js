import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./routes/Login";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <Routes>
        <Route exact path="/" component={Root} />
        <Route path="/login" component={Login} />
      </Routes>
    </RouterProvider>
  </React.StrictMode>
);
