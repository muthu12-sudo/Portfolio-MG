import "../stylesheet.css";

export default function Skills() {
  return (
    <>
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
                <li>Java</li>
                <li>Python</li>
                <li>HTML, CSS & Bootstrap</li>
                <li>Javascript with React</li>
                <li>MS Office</li>
                <li>Photoshop</li>
              </ul>
            </div>
          </div>

          <div className="card__side card__side--front">
            <div className="card__theme">
              <div className="card__theme-box">
                <p className="card__subject">technical</p>
                <p className="card__subject"> skills</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
