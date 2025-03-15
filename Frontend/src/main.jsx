import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

// Importing Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import PrivateRoute from "./pages/auth/PrivateRoute.jsx";
import Profile from "./pages/user/Profile.jsx";
import AdminRoute from "./pages/Admin/AdminRoutes.jsx";
import GenreList from "./pages/Admin/GenreList.jsx";

// Define Routes
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },

        // PrivateRoute Wrapper for Protected Routes
        {
          element: <PrivateRoute />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
          ],
        },

        // AdminRoute Wrapper for Admin Pages
        {
          element: <AdminRoute />,
          children: [
            {
              path: "admin/movies/genre",
              element: <GenreList />,
            },
          ],
        },
      ],
    },
  ]
);

// Render App
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
