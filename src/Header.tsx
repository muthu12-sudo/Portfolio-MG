import { useState } from "react";
import "./Header.css";

function Header() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="header">
        <br></br>
        <h2>
          Dynamic{" "}
          <span>
            <img src="/src/assets/react.svg" width="35px" />
          </span>{" "}
          React Page
        </h2>
        <img id="mg" src="/Cartoon-MG.png" width="300px" />
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
