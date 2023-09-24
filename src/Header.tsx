import { useState } from "react";
import "./Header.css";

function Header() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="header">
        <h1>
          This is Dynamic{" "}
          <span>
            <img src="/src/assets/react.svg" />
          </span>{" "}
          React Page
        </h1>
        <img id="mg" src="/Cartoon-MG.png" width="300px" />
        <h1>Welcome</h1>
        <br />
        <button
          className="btn btn-secondary"
          onClick={() => setCount(count + 1)}>
          Welcome {count}
        </button>
      </div>
    </>
  );
}

export default Header;
