import { useEffect, useState } from "react";
import "../styles.css";

interface NavbarProps {
  type: string;
}

export default function Navbar(props: NavbarProps) {
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
  const { type } = props;

  return (
    <>
      <div className="NavbarContainer">
        <div className="Navbar">
          <h1>Muthuganesh R</h1>
          <button>{type}</button>
        </div>
        <hr style={{ width: navbarWidth }} />
      </div>
    </>
  );
}
