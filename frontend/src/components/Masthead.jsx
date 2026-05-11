import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/jobs_logo.png';
import { useAuth } from '../context/AuthContext';

const Masthead = () => {
  const navigate = useNavigate();
  const {currentUser, logout } = useAuth();

  return (
    <nav className="top-nav">
      <img
        src={logo}
        alt="Jobs++"
        className="nav-logo"
        onClick={() => navigate('/')}
      />
      <div className="nav-actions">

        {currentUser ? (
          <>
            <div className="nav-user">
              <div className="nav-avatar">
                {(currentUser.displayName?.[0] ?? currentUser.email?.[0] ?? '?').toUpperCase()}
              </div>
              <span className="nav-username">{currentUser.displayName ?? currentUser.email}</span>
            </div>
            <button className="btn-ghost" onClick={logout}>Sign Out</button>
          </>
        ) : (
          <>
            <button className="btn-ghost" onClick={() => navigate('/access')}>Sign In</button>
            <button className="btn-primary" onClick={() => navigate('/access')}>Sign Up</button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Masthead;
