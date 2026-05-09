import React from 'react'
import './Modal.css'

const Modal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <p className="modal-company">{job.company_name}</p>
        <h2 className="modal-title">{job.title}</h2>
        {job.location && <p className="modal-location">{job.location}</p>}
        <div className="modal-description" dangerouslySetInnerHTML={{ __html: job.description }} />
        <a className="job-apply-btn" href={job.url} target="_blank" rel="noreferrer">Apply →</a>
      </div>
    </div>
  )
}

export default Modal