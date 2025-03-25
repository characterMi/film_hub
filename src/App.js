import { CssBaseline, useTheme } from "@mui/material";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Loader, Navbar } from "./components";

import "react-toastify/dist/ReactToastify.css";

const Actors = lazy(() => import("./pages/Actors"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const Movies = lazy(() => import("./pages/Movies"));
const Profile = lazy(() => import("./pages/Profile"));

const RouteWithinSuspense = ({ child }) => (
  <Suspense fallback={<Loader size={"4rem"} />}>{child}</Suspense>
);

function App() {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    if (type === "movie" || type === "tv") {
      localStorage.setItem("type", type);

      setSearchParams({});
      window.location.reload();
    }
  }, []);

  return (
    <div className="root">
      <ToastContainer position="top-right" theme="colored" />
      <CssBaseline />
      <Navbar theme={theme} />
      <main className="content">
        <div className="toolbar" />
        <Routes>
          <Route
            path="/"
            element={<RouteWithinSuspense child={<Movies theme={theme} />} />}
          />
          <Route
            path="movie/:id"
            element={
              <RouteWithinSuspense child={<MoviePage theme={theme} />} />
            }
          />
          <Route
            path="actors/:id"
            element={<RouteWithinSuspense child={<Actors theme={theme} />} />}
          />
          <Route
            path="profile"
            element={<RouteWithinSuspense child={<Profile theme={theme} />} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
