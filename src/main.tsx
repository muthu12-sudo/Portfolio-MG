import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Initial/Header.tsx";
import Navbar from "./Nav/Navbar.tsx";
import "bootstrap/dist/css/bootstrap.css";
import Profile from "./Contents/Profile.tsx";
import FlipCard from "./Contents/FlipCard.tsx";
import Skill from "/Ok.png";
import Education from "/Education.png";
import Acheive from "/Acheive.png";
import Footer from "./Contents/Footer.tsx";
import Chatbot from "./Contents/Chatbot.tsx";

const acheivements = [
  "Machine Learning with Python Course",
  "Graphic Designing Internship",
  "MS Office Course Certificate",
  "C Course - Sololearn",
  "Intelligent Game Designing Course",
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <Navbar type="Contact Me" />
    <Profile />
    <div className="flip-cards-section">
      <FlipCard
        cardHeading1={"Education"}
        cardHeading2={"Background"}
        cardDetailHeading={"Academic Details"}
        list={[
          "SRM University of Science and Technology",
          "Degree: Masters in Computer Applications (MCA)",
          "Duration: October 2023 - May 2025",
          "Grade: 8.6",
          "Focus: AI, ML, and Software Development"
        ]}
        frontImage={Education}
        backImage={Education}
        backColor={"to right, #3498db 0%, #2ecc71 100%"}
      />
      <FlipCard
        cardHeading1={"Technical"}
        cardHeading2={"Skills"}
        cardDetailHeading={"Skill Set"}
        list={[
          "Generative AI: LangChain, LlamaIndex, Prompt Engineering",
          "Programming: Python, Java, Web Development",
          "GIS & Geo AI: Spatial Data Analysis, Geospatial AI Solutions",
          "Leadership: Team Leading, Hackathons, Project Management"
        ]}
        frontImage={Skill}
        backImage={Skill}
        backColor={"to right, #667eea 0%, #764ba2 100%"}
      />
    </div>
    <FlipCard
      cardHeading1={"Standout"}
      cardHeading2={"Achievements"}
      cardDetailHeading={"Accomplishments"}
      list={acheivements}
      frontImage={Acheive}
      backImage={Acheive}
      backColor={"to right, #f9d423 0%, #ff4e50 100%"}
    />
    <Footer />
    <Chatbot />
  </React.StrictMode>
);
