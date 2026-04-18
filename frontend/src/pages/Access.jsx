import React from 'react'
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import "../../css/Access.css";

const Access = () => {

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="access-page">
      <div className="access-left">
        <div className="access-left-inner">
          <div className="access-topline">MULTI SOURCE JOB SEARCH</div>
          <h1 className="access-title">Jobs++</h1>
        </div>
      </div>

      <div className="access-right">
        <div className="access-right-inner">
          <div className="access-kicker">Access</div>
          <h2 className="access-subtitle">Sign up/in</h2>

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