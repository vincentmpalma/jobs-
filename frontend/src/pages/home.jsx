import React, { useState } from 'react';
import currencies from '../../data/currencies.json';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Masthead from '../components/Masthead';

const currencyOptions = Object.values(currencies).map(c => ({
  value: c.code,
  label: `${c.code} — ${c.name}`
}));

const Home = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isRemote, setIsRemote] = useState('include');
  const [currency, setCurrency] = useState(null);

  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/search?title=${title}`);
  };

  return (
    <div className="home-page">
      <Masthead />

      <div className="hero-section">
        <div className="hero-text">
          <h1 className="hero-headline">Find jobs.</h1>
        </div>

        <form className="search-bar-form" onSubmit={submitSearch}>
          <div className="search-bar">
            <input
              className="search-input"
              type="text"
              placeholder="Job title or keyword"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="search-bar-divider" />
            <input
              className="search-input"
              type="text"
              placeholder="City, state, or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isRemote === 'only'}
            />
            <button className="search-bar-btn" type="submit">Search</button>
          </div>

          <div className="filter-row">
            <div className="filter-chips">
              {[
                { value: 'include', label: 'All Jobs' },
                { value: 'only',    label: 'Remote'   },
                { value: 'exclude', label: 'On-site'  },
              ].map(({ value, label }) => (
                <label key={value} className="filter-chip">
                  <input
                    type="radio"
                    name="remote"
                    value={value}
                    checked={isRemote === value}
                    onChange={(e) => {
                      setIsRemote(e.target.value);
                      if (e.target.value === 'only') setLocation('');
                    }}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <div className="salary-compact">
              <Select
                options={currencyOptions}
                value={currency}
                onChange={setCurrency}
                placeholder="Currency"
                className="salary-select"
                classNamePrefix="csel"
              />
              <input className="salary-input" type="number" placeholder="Min" />
              <span className="salary-sep">—</span>
              <input className="salary-input" type="number" placeholder="Max" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
