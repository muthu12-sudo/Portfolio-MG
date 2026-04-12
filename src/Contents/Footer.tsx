import { BiLogoReact } from "react-icons/bi";
import { FcFlashOn } from "react-icons/fc";
export default () => {
  return (
    <>
      <div className="Navbar Footer d-flex justify-content-center">
        <h5>
          &copy; This Site is Completely developed by Me . <br />
          Vite <FcFlashOn /> + React{" "}
          <BiLogoReact fill="#02DBFF" stroke="#02DBFF" />
        </h5>
      </div>
    </>
  );
};
