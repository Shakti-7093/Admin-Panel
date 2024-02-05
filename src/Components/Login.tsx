import React, { useEffect } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import "./Sigin.css";
import { Outlet } from "react-router-dom";
import avatar from '../assets/456322.webp'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} variant="filled" {...props} ref={ref} />
));

function Login() {
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
      })
      .finally(() => {
        if (email && email !== "webkit7093@gmail.com") {
          setOpen(true);
        }
      });
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    setEmail(userEmail);
  }, []);


  if (email === "webkit7093@gmail.com") {
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Invalid email! Only Admin can access the dashboard.
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default Login;