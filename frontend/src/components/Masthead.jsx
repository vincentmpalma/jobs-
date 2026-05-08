import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/jobs_logo.png';

const Masthead = () => {
  const navigate = useNavigate();

  return (
    <nav className="top-nav">
      <img
        src={logo}
        alt="Jobs++"
        className="nav-logo"
        onClick={() => navigate('/')}
      />
      <div className="nav-actions">
        <button className="btn-ghost" onClick={() => navigate('/access')}>Sign In</button>
        <button className="btn-primary" onClick={() => navigate('/access')}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Masthead;
