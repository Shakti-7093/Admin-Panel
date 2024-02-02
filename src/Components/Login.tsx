import { useEffect } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import "./Sigin.css";
import { Outlet } from "react-router-dom";
import avatar from "../assets/456322.webp";

function Login() {
  const [email, setEmail] = useState<string | null>(null);

  const handleSignInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        if (data.user.email) {
          setEmail(data.user.email);
          localStorage.setItem("email", data.user.email);
        }
      })
      .catch((error) => {
        console.error("Google Sign-In Error", error);
      });
  };

  useEffect(() => {
    setEmail(localStorage.getItem("email") || null);
  }, []);

  if (email) {
    return <Outlet />;
  } else {
    return (
      <div className="main-div-s">
        <div className="box-main">
          <div className="box">
            <div className="boxGrop">
              <div className="img-box">
                <img className="loginImage" src={avatar} alt="" />
              </div>
              <button className="singin-btn" onClick={handleSignInGoogle}>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;