import "./style.css";
import Pose from "/Header_Image.png";

function Header() {
  return (
    <>
      <div className="header">
        <h1>Welcome to My Portfolio</h1>
        <div className="container">
          <div className="bubble">
            <p>Explore my journey as a Gen AI Developer</p>
          </div>
        </div>
        <img
          id="mg"
          src={Pose}
          width={350}
          alt="Cartoon Image"
        />
        <h2>Personal Portfolio of Muthuganesh R &#128521;</h2>
      </div>
    </>
  );
}

export default Header;
