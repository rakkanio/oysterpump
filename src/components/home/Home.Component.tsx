import "./Home.css";

import manTrollyImg from "./../../assets/man-trolly.jpeg";
function HomeComponent() {
  return <>

    <div className="container">
      <img src={manTrollyImg} alt="home_p" />
    </div>
  </>
}

export default HomeComponent;