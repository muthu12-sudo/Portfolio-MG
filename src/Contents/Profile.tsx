import MGImg from "/Mg-Img.jpg";
export default function Profile() {
  return (
    <>
      <div className="Profile">
        <div id="mgimg">
          <img src={MGImg} alt="MG-Img" />
        </div>
        <div className="ProfileContainer">
          <h1>Hello There</h1>

          <section className="profile-section">
            <h2>Personal Details</h2>
            <div className="section-content">
              <p><strong>Name:</strong> Muthuganesh R</p>
              <p><strong>Role:</strong> Gen AI Developer</p>
              <p><strong>Location:</strong> Tamilnadu, India</p>
              <p><strong>Phone:</strong> 9688241253</p>
              <p><strong>Email:</strong> muthuganesh2205@gmail.com</p>
              <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/muthuganesh-r-32b2031b5" target="_blank" rel="noopener noreferrer">Muthuganesh R</a></p>
              <p><strong>GitHub:</strong> <a href="https://github.com/muthu12-sudo" target="_blank" rel="noopener noreferrer">muthu12-sudo</a></p>
            </div>
          </section>

          <section className="profile-section">
            <h2>Professional Summary</h2>
            <div className="section-content">
              <p>Gen AI Developer with 2 years of experience at TCS, specializing in building Geo AI solutions. Highly skilled in Generative AI, Python, Prompt Engineering, and modern frameworks. Experienced in leading teams, participating in AI hackathons, and delivering innovative solutions.</p>
            </div>
          </section>

          <section className="profile-section">
            <h2>Work Experience</h2>
            <div className="section-content">
              <div className="experience-item">
                <h3>Tata Consultancy Services (TCS) — GenAI Developer</h3>
                <p className="experience-meta">November 2023 - Present | Kochi, Kerala</p>
                <ul>
                  <li>Developed and implemented Geo AI solutions leveraging Generative AI and spatial data analysis.</li>
                  <li>Contributed to multiple AI-driven projects and provided leadership in team-based initiatives.</li>
                  <li>Developed and deployed Geo AI solutions integrating GIS with Gen AI technologies.</li>
                  <li>Led a team of developers on AI projects, ensuring timely and efficient delivery.</li>
                  <li>Applied LangChain, LlamaIndex, and other Gen AI frameworks for enterprise solutions.</li>
                  <li>Contributed to hackathons and internal innovation initiatives.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <h2>Languages</h2>
            <div className="section-content">
              <p>English, Tamil, Malayalam</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
