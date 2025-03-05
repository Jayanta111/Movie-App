import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';  // Corrected the 'ReactDom' to 'ReactDOM'
import './index.css';
import App from './App.jsx';
import store from './redux/store.js';
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<Home />} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(  // Corrected here
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
