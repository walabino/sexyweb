import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";

import "./global.scss";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Rightbar from "./components/rightbar/Rightbar.jsx";
import Leftbar from "./components/leftbar/Leftbar.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkMode";
import { AuthContext } from "./context/authContext";
import Posts from "./components/posts/Posts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Modal from "./components/modal/Modal";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient();
  const toggleBody = () => {
    if (!darkMode) {
      document.body.style.backgroundColor = "hsl(252, 30%, 95%)";
    } else {
      document.body.style.backgroundColor = "hsl(0, 1%, 24%)";
    }
  };
  useEffect(() => {
    toggleBody();
  }, [darkMode]);
  toggleBody();
  const Layout = () => {
    const [key, setKey] = useState(0);
    const location = useLocation();

    useEffect(() => {
      setKey(key + 1);
    }, [location]);
    return (
      <QueryClientProvider client={queryClient}>
        <div
          className={darkMode ? "theme-dark" : "theme-light"}
          style={{ position: "relative" }}
        >
          <Navbar />
          <div className="contenedor">
            <Leftbar />
            <Outlet key={key} />
            <Rightbar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };
  const ProtectedRoute = ({ children }) => {
    if (currentUser) {
      return children;
    }
    return <Navigate to="/login" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/modal",
      element: <Modal />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
