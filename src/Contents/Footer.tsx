import { BiLogoReact } from "react-icons/bi";
import { FcFlashOn } from "react-icons/fc";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

export default () => {
  return (
    <>
      <div className="footer bg-dark text-white py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-6 mb-4">
              <h5 className="text-white mb-3">Contact Information</h5>
              <p className="mb-2 text-white"><FaPhone className="me-2" />9688241253</p>
              <p className="mb-2 text-white"><FaEnvelope className="me-2" />muthuganesh2205@gmail.com</p>
              <p className="mb-2 text-white"><FaLinkedin className="me-2" /><a href="https://www.linkedin.com/in/muthuganesh-r-32b2031b5" target="_blank" rel="noopener noreferrer" className="text-white">Muthuganesh R</a></p>
              <p className="mb-2 text-white"><FaGithub className="me-2" /><a href="https://github.com/muthu12-sudo" target="_blank" rel="noopener noreferrer" className="text-white">muthu12-sudo</a></p>
            </div>
            <div className="col-md-6">
              <h5 className="text-white mb-3">Built With</h5>
              <p className="mb-0 fs-5 text-white">
                Vite <FcFlashOn className="mx-1" /> + React{" "}
                <BiLogoReact fill="#61dafb" stroke="#61dafb" className="ms-1" />
              </p>
              <p className="mt-3 text-white">&copy; 2026 Muthuganesh R. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
