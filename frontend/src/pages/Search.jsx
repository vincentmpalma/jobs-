import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import '../../css/Search.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [jobsList, setJobList] = useState([]);
  const [expandedJobs, setExpandedJobs] = useState({});

  const title = searchParams.get('title');

  useEffect(() => {
    console.log("in useEffect")

    const searchJobs = async () => {
      console.log("title: " + title)
      const searchApiUrl = `http://localhost:8080/jobs?title=${title}`
      const searchApiRes = await fetch(searchApiUrl)
      const searchApiData = await searchApiRes.json()
      console.log(searchApiData)

      setJobList(searchApiData.data)
    }

    searchJobs()
  }, [])

  const toggleExpanded = (slug) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  return (
    <div className="search-page">
      <div className="search-shell">
        <header className="results-header">
          <div className="results-kicker">Search Results</div>
          <h1 className="results-title">Searched for {title}</h1>
        </header>

        <div className="results-list">
          {jobsList.map((job) => (
            <article className="job-card" key={job.slug}>
              <div className="job-card-top">
                <h2 className="job-title">{job.title}</h2>

                <div className="job-meta">
                  <span className="job-company">{job.company_name}</span>
                  <span className="job-meta-divider">•</span>
                  <span className="job-location">{job.location}</span>
                </div>
              </div>

              <div
                className={`job-description ${expandedJobs[job.slug] ? 'expanded' : 'collapsed'}`}
                dangerouslySetInnerHTML={{ __html: job.description }}
              ></div>

              <div className="job-card-footer">
                <div className="job-card-actions">
                  <button
                    className="view-more-button"
                    onClick={() => toggleExpanded(job.slug)}
                    type="button"
                  >
                    {expandedJobs[job.slug] ? 'View Less' : 'View More'}
                  </button>

                  <a
                    className="job-link"
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Posting
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Search