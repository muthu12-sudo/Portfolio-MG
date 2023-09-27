import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./Initial/ErrorPage.tsx";
import Navbar from "./Nav/Navbar.tsx";
import "bootstrap/dist/css/bootstrap.css";
import Profile from "./Contents/Profile.tsx";
import Skills from "./Contents/Skills.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar />
    <Profile />
    <Skills />
    <ErrorPage />
  </React.StrictMode>
);
