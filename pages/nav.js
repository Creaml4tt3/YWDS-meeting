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

  return (
    <div className="Nav-Container">
      <Link href="/meeting-01">
        <div className="Nav" id="Nav01">
          Meeting 01
        </div>
      </Link>
      <Link href="/">
        <div className="Home" id="Home">
          <Lottie animationData={Home} loop autoPlay></Lottie>
        </div>
      </Link>
      <Link href="/meeting-02">
        <div className="Nav" id="Nav02">
          Meeting 02
        </div>
      </Link>
    </div>
  );
}
