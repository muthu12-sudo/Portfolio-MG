import { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";
import "../styles.css";

interface NavbarProps {
  type: string;
}

export default function Navbar(props: NavbarProps) {
  const [navbarWidth, setNavbarWidth] = useState("0%");
  const [showContactModal, setShowContactModal] = useState(false);

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

  const handleContactClick = () => {
    setShowContactModal(!showContactModal);
  };

  return (
    <>
      <div className="NavbarContainer">
        <div className="Navbar">
          <h1>Muthuganesh R</h1>
          <button onClick={handleContactClick}>{type}</button>
        </div>
        <hr style={{ width: navbarWidth }} />
      </div>

      {showContactModal && (
        <div className="contact-modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowContactModal(false)}>×</button>
            <h2>Contact Information</h2>
            <div className="contact-options">
              <a href="mailto:muthuganesh2205@gmail.com" className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>muthuganesh2205@gmail.com</span>
              </a>
              <a href="tel:+919688241253" className="contact-item">
                <FaPhone className="contact-icon" />
                <span>9688241253</span>
              </a>
              <a href="https://github.com/muthu12-sudo" target="_blank" rel="noopener noreferrer" className="contact-item">
                <FaGithub className="contact-icon" />
                <span>github.com/muthu12-sudo</span>
              </a>
              <a href="https://linkedin.com/in/muthuganesh-r" target="_blank" rel="noopener noreferrer" className="contact-item">
                <FaLinkedin className="contact-icon" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
