import MGImg from "/Mg-Img.jpg";
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
    </>
  );
}
