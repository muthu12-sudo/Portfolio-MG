import "../stylesheet.css";
interface Props {
  cardHeading1: String;
  cardHeading2: String;
  cardDetailHeading: String;
  list: String[];
  frontImage: String;
  backImage?: String;
  backColor?: String;
}
export default function Skills(props: Props) {
  return (
    <>
      <div className="artboard">
        <div className="card">
          <div className="card__side card__side--back">
            <div
              className="card__cover"
              style={{ backgroundColor: `rgb(${props.backColor})` }}>
              <h4 className="card__heading">
                <span className="card__heading-span">
                  {props.cardDetailHeading}
                </span>
              </h4>
            </div>
            <div
              className="card__details"
              style={{ backgroundImage: `url(${props.backImage})` }}>
              <ul>
                {props.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="card__side card__side--front"
            style={{ backgroundImage: `url(${props.frontImage})` }}>
            <div className="card__theme">
              <div className="card__theme-box">
                <p className="card__subject">{props.cardHeading1}</p>
                <p className="card__subject">{props.cardHeading2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
