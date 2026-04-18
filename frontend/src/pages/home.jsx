import React, { useState } from 'react';
import currencies from '../../data/currencies.json';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import Access from './Access';

const currencyOptions = Object.values(currencies).map(currency => ({
  value: currency.code,
  label: `${currency.code} - ${currency.name}`
}));

const Home = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isRemote, setIsRemote] = useState("");
  const [currency, setCurrency] = useState(null);

  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    console.log("in submitSearch");
    console.log(`title: ${title}`);
    console.log(`location: ${location}`);
    console.log(`isRemote: ${isRemote}`);
    console.log(`currency: ${currency?.value}`);

    navigate(`/search?title=${title}`)
  };

  return (
    <div className="home-page">
      <div className="home-shell">
        <header className="masthead">

  <div className="masthead-inner">

    <div className="masthead-left">
      <div className="masthead-topline">MULTI SOURCE JOB SEARCH</div>
      <h1 className="brand">Jobs++</h1>
    </div>

    <div className="masthead-right">
      <button className="auth-button sign-in" onClick={()=>navigate('/access')}>Sign In</button>
      <button className="auth-button sign-up" onClick={()=>navigate('/access')}>Sign Up</button>
    </div>

  </div>

</header>

        <section className="search-panel">
          <div className="panel-header">
            <span className="panel-kicker">SEARCH</span>
            <h2 className="panel-title">query</h2>
          </div>

          <form onSubmit={submitSearch} className="search-form">
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input
                className="text-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location</label>
              <input
                className="text-input"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isRemote === 'only'}
             
              />
            </div>

            <div className="form-group">
              <label className="form-label">Remote Preference</label>

              <div className="radio-row">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="remote"
                    value="include"
                    onChange={(e) => setIsRemote(e.target.value)}
                  />
                  <span>Include Remote</span>
                </label>

                <label className="radio-option">
                  <input
                    type="radio"
                    name="remote"
                    value="exclude"
                    onChange={(e) => setIsRemote(e.target.value)}
                  />
                  <span>Exclude Remote</span>
                </label>

                <label className="radio-option">
                  <input
                    type="radio"
                    name="remote"
                    value="only"
                    onChange={(e) => {
                      setIsRemote(e.target.value);
                      setLocation("");
                    }}
                  />
                  <span>Remote Only</span>
                </label>
              </div>
            </div>

            <div className="salary-block">
              <div className="form-group">
                <label className="form-label">Currency</label>
                <Select
                  options={currencyOptions}
                  value={currency}
                  onChange={(selectedOption) => setCurrency(selectedOption)}
                  className="currency-select"
                  classNamePrefix="jobs-select"
                />
              </div>

              <div className="salary-row">
                <div className="form-group salary-field">
                  <label className="form-label">Low</label>
                  <input className="text-input" type="number" />
                </div>

                <div className="salary-divider">to</div>

                <div className="form-group salary-field">
                  <label className="form-label">High</label>
                  <input className="text-input" type="number" />
                </div>
              </div>
            </div>

            <button className="search-button" type="submit">
              Search
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Home;