import cartoonmg from "/Cartoon-MG.png";
import MGImg from "/Mg-Img.jpg";
import "../stylesheet.css";
export default function Profile() {
  return (
    <>
      <div className="Profile">
        {" "}
        <div id="mgimg">
          <img src={MGImg} width="300px" />
        </div>
        <div className="ProfileContainer">
          <p>
            LoremPariatur nostrud non deserunt nostrud cillum. Nostrud est
            ullamco officia anim labore. Amet anim officia mollit velit sunt. Id
            enim esse duis velit. Proident quis velit fugiat mollit amet sint
            occaecat aliquip consectetur. Adipisicing aute Lorem ea laborum enim
            consequat excepteur aliquip cillum anim.
          </p>
        </div>
      </div>
      <div className="artboard">
        <div className="card">
          <div className="card__side card__side--back">
            <div className="card__cover">
              <h4 className="card__heading">
                <span className="card__heading-span">Skill Set</span>
              </h4>
            </div>
            <div className="card__details">
              <ul>
                <li>Advanced JS and CSS</li>
                <li>JS/CSS Preprocessors</li>
                <li>JS Frameworks</li>
                <li>Advanced Animations</li>
                <li>Deployment Pipelines</li>
                <li>Large Apps Architectures</li>
                <li>Naming Conventions</li>
              </ul>
            </div>
          </div>

          <div className="card__side card__side--front">
            <div className="card__theme">
              <div className="card__theme-box">
                <p className="card__subject">Muthuganesh</p>
                <p className="card__subject">Hello World!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
