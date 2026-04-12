import { useState } from "react";
import "./style.css";
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
        <div className="container">
          <div className="bubble">
            <p>
              Currently, The site is under construction <FcSupport />
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
          Until we meet again&nbsp; <FcCloseUpMode />
        </h2>
        <br />
        <button onClick={changeImg}>Bye</button>
      </div>
    </>
  );
}

export default ErrorPage;
