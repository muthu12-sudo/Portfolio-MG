import React from "react";
import ReactDOM from "react-dom/client";
import ErrorPage from "./Initial/ErrorPage.tsx";
import Navbar from "./Nav/Navbar.tsx";
import "bootstrap/dist/css/bootstrap.css";
import Profile from "./Contents/Profile.tsx";
import FlipCard from "./Contents/FlipCard.tsx";
import Skill from "/Ok.png";
import Acheive from "/Acheive.png";
import Footer from "./Contents/Footer.tsx";

const skills = [
  "Java",
  "Python, Django",
  "HTML, CSS & Bootstrap",
  "Typescript, React JS",
  "Unity Game Engine",
  "PHP & MySQL",
  "MS Office",
  "Photoshop",
];

const acheivements = [
  "Machine Learning with Python Course",
  "Graphic Designing Internship",
  "MS Office Course Certificate",
  "C Course - Sololearn",
  "Intelligent Game Designing Course",
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar type="Contact Me" />
    <Profile />
    <FlipCard
      cardHeading1={"Technical"}
      cardHeading2={"Skills"}
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
      backColor={"to right, #f9d423 0%, #ff4e50 100%"}
    />
    <ErrorPage />
    <Footer />
  </React.StrictMode>
);
