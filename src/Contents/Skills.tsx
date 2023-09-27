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
                <li>HTML</li>
                <li>CSS, Bootstrap</li>
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
