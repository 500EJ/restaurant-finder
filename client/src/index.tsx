import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, { rootLoader } from "./routes/Root";
import Home from "./routes/Home";
import Restaurant from "./routes/restaurants/Restaurant";
import EditRestaurant from "./routes/restaurants/EditRestaurant";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    loader: rootLoader,
    children: [
      { path: "/", element: <Home /> },
      { path: "/restaurants/:id", element: <Restaurant /> },
      { path: "/restaurants/:id/edit", element: <EditRestaurant /> }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
