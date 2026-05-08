import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../css/Search.css';
import Masthead from '../components/Masthead';

const AVATAR_COLORS = [
  { bg: '#EEF2FF', fg: '#4F46E5' },
  { bg: '#FEF9C3', fg: '#CA8A04' },
  { bg: '#DCFCE7', fg: '#16A34A' },
  { bg: '#FCE7F3', fg: '#DB2777' },
  { bg: '#E0F2FE', fg: '#0284C7' },
  { bg: '#FEF3C7', fg: '#D97706' },
  { bg: '#F3E8FF', fg: '#9333EA' },
];

function avatarColor(name) {
  const idx = Math.abs(((name || '?').charCodeAt(0) - 65)) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const [jobsList, setJobList] = useState([]);
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (slug) =>
    setExpanded(prev => ({ ...prev, [slug]: !prev[slug] }));

  const title = searchParams.get('title');

  useEffect(() => {
    const searchJobs = async () => {
      try {
        const res = await fetch(`http://localhost:8080/jobs?title=${title}`);
        const data = await res.json();
        setJobList(data.data ?? []);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      }
    };
    searchJobs();
  }, []);

  return (
    <div className="search-page">
      <div className="search-shell">
        <Masthead />

        <div className="results-header">
          <p className="results-kicker">Search Results</p>
          <h1 className="results-title">
            {jobsList.length > 0
              ? <><span className="results-count">{jobsList.length}</span> listings for <em>"{title}"</em></>
              : <>Searching for <em>"{title}"</em>&hellip;</>
            }
          </h1>
        </div>

        <div className="job-grid">
          {jobsList.map((job) => {
            const { bg, fg } = avatarColor(job.company_name);
            const isRemote = job.location?.toLowerCase().includes('remote');

            const isExpanded = !!expanded[job.slug];

            return (
              <article className="job-card" key={job.slug}>
                <div className="job-card-header">
                  <div className="job-avatar" style={{ background: bg, color: fg }}>
                    {(job.company_name?.[0] ?? '?').toUpperCase()}
                  </div>
                  <span className="job-company">{job.company_name}</span>
                </div>

                <h2 className="job-title">{job.title}</h2>

                <div className="job-meta">
                  {job.location && <span className="job-location">{job.location}</span>}
                  {isRemote && <span className="tag-remote">Remote</span>}
                </div>

                <p className={`job-desc-preview${isExpanded ? ' job-desc-expanded' : ''}`}>
                  {stripHtml(job.description)}
                </p>

                <button
                  className="view-more-btn"
                  onClick={() => toggleExpand(job.slug)}
                >
                  {isExpanded ? 'Show less ↑' : 'Show more ↓'}
                </button>

                <div className="job-card-footer">
                  <a className="job-apply-btn" href={job.url} target="_blank" rel="noreferrer">
                    Apply →
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
