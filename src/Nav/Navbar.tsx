import { useEffect, useState } from "react";
import "../styles.css";

export default function Navbar() {
  const [navbarWidth, setNavbarWidth] = useState("0%");

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const PageTotalWidth =
      document.documentElement.scrollHeight - window.innerHeight;
    const percentageScrolled = (scrollY / PageTotalWidth) * 100;

    const newWidth = Math.min(Math.max(percentageScrolled, 0), 100) + "%";
    setNavbarWidth(newWidth);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="NavbarContainer">
        <div className="Navbar">
          <h1>Muthuganesh R</h1>
          <span>About</span>
          <span>Projects</span>
          <span>Education</span>
        </div>
        <hr style={{ width: navbarWidth }} />
      </div>
    </>
  );
}
