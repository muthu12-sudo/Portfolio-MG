import { useState } from "react";
import "./style.css";
import reactlogo from "./assets/react.svg";
import cartoonmg from "/Cartoon-MG.png";
function Header() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="header">
        <br></br>
        <h1>
          <span>
            <img src={reactlogo} width="40px" />
          </span>{" "}
          React Dynamic Page
        </h1>
        <img id="mg" src={cartoonmg} width="300px" />
        <h2>Click Here to See the Dynamic Content</h2>
        <br />
        <button onClick={() => setCount(count + 1)}>Click {count}</button>
      </div>
    </>
  );
}

export default Header;
