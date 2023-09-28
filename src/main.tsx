import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./Initial/ErrorPage.tsx";
import Navbar from "./Nav/Navbar.tsx";
import "bootstrap/dist/css/bootstrap.css";
import Profile from "./Contents/Profile.tsx";
import FlipCard from "./Contents/FlipCard.tsx";
import Skill from "/Ok.png";
import Acheive from "/Acheive.png";

const skills = [
  "Java",
  "Python",
  "HTML, CSS & Bootstrap",
  "Javascript with React",
  "MS Office",
  "Photoshop",
  "PHP & MySQL",
];

const acheivements = [
  "Graphic Designing Internship",
  "Intelligent Game Designing Course",
  "Certificate of Appreciation for College Website",
  "Machine Learning with Python Course",
  "C Course - Sololearn",
  "MS Office Course Certificate",
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar type="Contact Me" />
    <Profile />
    <FlipCard
      cardHeading1={"technical"}
      cardHeading2={"skills"}
      cardDetailHeading={"Skill Set"}
      list={skills}
      frontImage={Skill}
      backImage={Skill}
    />
    <FlipCard
      cardHeading1={"Few of my"}
      cardHeading2={"Acheivements"}
      cardDetailHeading={"Accomplishments"}
      list={acheivements}
      frontImage={Acheive}
      backImage={Acheive}
      backColor={"255,67,54"}
    />
    <ErrorPage />
  </React.StrictMode>
);
