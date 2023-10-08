import { useState } from "react";
import "./style.css";
import reactlogo from "/react.gif";
import cartoonmg from "/Cartoon-MG.png";
import nomeme from "/nomeme.png";
import { FcCloseUpMode, FcSupport } from "react-icons/fc";

function ErrorPage() {
  const [flag, isImage] = useState(true);

  const changeImg = () => {
    isImage((prevState) => !prevState);
  };

  return (
    <>
      <div className="Error">
        <img src={reactlogo} width="40px" alt="React Logo" />
        <h1>Welcome, All!</h1>
        <div className="container">
          <div className="bubble">
            <p>
              Currently, this&nbsp; site is under construction <FcSupport />
            </p>
          </div>
        </div>
        <img
          id="mg"
          src={flag ? cartoonmg : nomeme}
          width={300}
          height={flag ? "" : 378.95}
          alt={flag ? "Cartoon Image" : "No Meme"}
        />
        <h2 className="d-flex justify-content-center">
          Personal Portfolio for Me&nbsp; <FcCloseUpMode />
        </h2>
        <br />
        <button onClick={changeImg}>Bye</button>
      </div>
    </>
  );
}

export default ErrorPage;
