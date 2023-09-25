import { useState } from "react";
import "./style.css";
import reactlogo from "/react.gif";
import cartoonmg from "/Cartoon-MG.png";
import nomeme from "/nomeme.png";

function Header() {
  const [flag, isImage] = useState(true);

  const changeImg = () => {
    isImage((prevState) => !prevState);
  };

  return (
    <>
      <div className="header">
        <img src={reactlogo} width="40px" alt="React Logo" />
        <h1>Welcome Everyone!</h1>
        <div className="container">
          <div className="bubble">
            <p>Currently, this&nbsp; site is under construction</p>
          </div>
        </div>
        <img
          id="mg"
          src={flag ? cartoonmg : nomeme}
          width={350}
          height={flag ? "" : 444}
          alt={flag ? "Cartoon Image" : "No Meme"}
        />
        <h2>
          The&nbsp; site created for an Personal Portfolio for Me &#128521;.
        </h2>
        <br />
        <button onClick={changeImg}>Bye</button>
      </div>
    </>
  );
}

export default Header;
