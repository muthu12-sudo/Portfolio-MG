import { useState } from "react";
import "./Header.css";
import reactlogo from "./assets/react.svg";
import cartoonmg from "/Cartoon-MG.png";
function Header() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="header">
        <br></br>
        <h2>
          <span>
            <img src={reactlogo} width="35px" />
          </span>{" "}
          React Dynamic Page
        </h2>
        <img id="mg" src={cartoonmg} width="300px" />
        <h3>Click Here to See the Dynamic Content</h3>
        <br />
        <button
          className="btn btn-secondary"
          onClick={() => setCount(count + 1)}>
          Click {count}
        </button>
      </div>
    </>
  );
}

export default Header;
