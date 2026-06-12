import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/jobs_logo_WHITE.png';
import "../../css/Access.css";

const Access = () => {
  const navigate = useNavigate();

  // trigger google oauth popup and redirect home on success
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // split layout — logo on the left, sign in form on the right
    <div className="access-page">
      <div className="access-left">
        <div className="access-left-inner">
          <img src={logo} alt="Jobs++" className="access-logo" />
        </div>
      </div>

      <div className="access-right">
        <div className="access-right-inner">
          <div className="access-kicker">Access</div>
          <h2 className="access-subtitle">Sign up/in</h2>
          <div className="access-divider"></div>

          {/* google is the only auth method right now */}
          <button
            className="google-button"
            onClick={handleGoogleSignIn}
          >
            <span className="google-icon">G</span>
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default Access
