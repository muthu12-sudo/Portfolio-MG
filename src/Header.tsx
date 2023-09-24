import { useState } from "react";
import "./Header.css";

function Header() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="header">
        <h1>Hello Everyone</h1>
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
