# Jobs++

A full-stack job aggregation platform that allows users to search job listings from multiple sources in a single interface.

## Overview

Jobs++ is a personal project focused on building a scalable and user-friendly job search experience. The goal is to aggregate job postings from multiple APIs and present them in a clean, structured format with filtering and personalization features.

## Features

- Search jobs by title  
- Dynamic job results rendering  
- Expandable job descriptions ("View More / View Less")  
- Direct links to original job postings  
- Salary range inputs (UI implemented)

## Tech Stack

**Frontend**
- React
- React Router
- CSS

**Backend**
- Node.js
- Express

**Other**
- REST APIs
- Fetch API
- CORS

## Architecture

The application follows a client-server architecture:

- The React frontend handles user input, routing, and rendering job data  
- The Express backend exposes API endpoints (e.g., `/jobs?title=...`)  
- The backend acts as an intermediary between the frontend and external job APIs  
- Data is fetched asynchronously and displayed dynamically in the UI  

## Current Status

This project is actively being developed.

**Current implementation:**
- Frontend search flow and results page  
- Backend endpoint returning job data  
- UI components for interacting with job listings  

## Planned Improvements

- Integrate multiple external job APIs to expand available listings  
- Add advanced filtering (location, remote preference, salary, etc.)  
- Implement user authentication using Firebase and MongoDB  
- Allow users to save jobs and store search preferences  
- Build an AI-powered feature to recommend jobs based on user preferences  

## Getting Started

### Prerequisites

- Node.js  
- npm or yarn  

### Installation

```bash
git clone https://github.com/vincentmpalma/jobs-.git
cd jobs-
```

# Project Setup

## Backend
```bash
cd backend
npm install
node index.js
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```

## Local Development

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:8080 |

## Example API Endpoint

```
GET /jobs?title=software
```

## Author

Vincent Palma
