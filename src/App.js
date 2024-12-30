import { CssBaseline, useTheme } from "@mui/material";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navbar } from "./components";

import "react-toastify/dist/ReactToastify.css";

const Actors = lazy(() => import("./pages/Actors"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const Movies = lazy(() => import("./pages/Movies"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const theme = useTheme();
  return (
    <div className="root">
      <ToastContainer position="top-right" theme="colored" />
      <CssBaseline />
      <Navbar theme={theme} />
      <main className="content">
        <div className="toolbar" />
        <Routes>
          <Route path="/" element={<Movies theme={theme} />} />
          <Route path="movie/:id" element={<MoviePage theme={theme} />} />
          <Route path="actors/:id" element={<Actors theme={theme} />} />
          <Route path="profile" element={<Profile theme={theme} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
