import MGImg from "/Mg-Img.jpg";
export default function Profile() {
  return (
    <>
      <div className="Profile ">
        {" "}
        <div id="mgimg">
          <img src={MGImg} width="300px" />
        </div>
        <div className="ProfileContainer">
          <h1>Hello There </h1>
          <p>
            &ensp; &ensp; &ensp; &ensp; &ensp; I am Muthuganesh, from
            Tirunelveli, Tamil Nadu, India. I am seeking an entry-level job
            while concurrently pursuing my Master's degree. I have excellent
            skills in web development and software development, and I have
            worked on several projects as a technical head and team leader.
          </p>
        </div>
      </div>
    </>
  );
}
