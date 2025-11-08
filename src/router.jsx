import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Dashboard from "./routes/Dashboard";
export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/dashboard", element: <Dashboard /> },
]);
