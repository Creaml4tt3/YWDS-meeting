import { useEffect } from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import * as Home from "../public/lottie/home.json";

export default function Nav(props) {
  useEffect(() => {
    var navToActive = document.getElementById(props.navActive);
    if (navToActive) {
      navToActive.classList.add("Nav-Active");
    }
  }, []);

  const homeStyle = {
    width: 64,
    height: 64,
  };

  return (
    <div className="Nav-Container">
      <Link href="/meeting-01">
        <div className="Nav" id="Nav01">
          ห้องประชุมที่ 01
        </div>
      </Link>
      <Link href="/">
        <div className="Home" id="Home">
          <div className="Home-Text">หน้าหลัก</div>
          <Lottie animationData={Home} loop autoPlay style={homeStyle}></Lottie>
        </div>
      </Link>
      <Link href="/meeting-02">
        <div className="Nav" id="Nav02">
          ห้องประชุมที่ 02
        </div>
      </Link>
    </div>
  );
}
