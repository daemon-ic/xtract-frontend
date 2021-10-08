const LandingPage = () => {
  return (
    <div className="full-container">
      <div className="navbar-landing">nav</div>
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-box left top">
            <h1
              style={{
                paddingLeft: "2%",
                color: "#e8e8e8",
                fontSize: "calc(12vw + 40px)",
                padding: "0",
                margin: "0",
              }}
            >
              Xtract.
            </h1>
            <div
              style={{
                paddingLeft: "4%",
                color: "#e8e8e8",
                fontSize: "20px",
                padding: "0",
                marginTop: "-20px",
              }}
            >
              an online web scraping utility
            </div>
          </div>
          <div className="hero-box right">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "50px",
              }}
            >
              <p>Technologies used</p>
              <div>Puppeteer</div>
              <div>Firebase storage</div>
              <div>React js</div>
              <div>Node js</div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  paddingTop: "100px",
                }}
              >
                dsfsf sfdfs dsfsdfs fdsfs dfsdfsf sfsf sfsfsf sfds
                sfssdfsdfdsfds sfssdfsdfdsfdssdfsfs dsf fsdfsfdsf sfsdsf
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-section">Bottom</div>
    </div>
  );
};
export default LandingPage;
