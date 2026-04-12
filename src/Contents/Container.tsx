import { BrowserRouter as Router, Link } from "react-router-dom";
export default function Container() {
  return (
    <>
      <div className="container-fluid bg-dark text-white">
        <h1>
          <Router>
            <Link to="www.google.com" target="_blank">
              <button>GO GOOGLE</button>
            </Link>
          </Router>
        </h1>
      </div>
    </>
  );
}
