# Jobs++

A job search app that aggregates listings from multiple sources into one place.

## Features

- Search jobs by title across multiple APIs
- Expandable job descriptions with a full detail modal
- Filter by remote, on-site, or all jobs
- Google authentication via Firebase
- Direct apply links for each listing

## Tech Stack

**Frontend** — React, React Router, Firebase Auth, CSS

**Backend** — Node.js, Express

**APIs** — Arbeitnow, USAJobs

## Getting Started

### Prerequisites

- Node.js
- A [USAJobs API account](https://developer.usajobs.gov/apirequest/)
- A [Firebase project](https://console.firebase.google.com/) with Google Authentication enabled

### Environment Setup

**Backend — create `/backend/.env`**

Go to https://developer.usajobs.gov/apirequest/ and request an API key. You'll receive the key at the email you register with.

```
USA_JOBS_API_KEY=your_api_key_here
USER_AGENT_EMAIL=the_email_you_registered_with
```

**Frontend — create `/frontend/.env`**

Go to https://console.firebase.google.com/ and create a new project. Then:

1. Go to **Authentication** → **Sign-in method** and enable **Google**
2. Go to **Project Settings** → **Your apps** and register a web app
3. Copy the config values into a `.env` file inside the `frontend` folder:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Running Locally

**1. Clone the repo**

```bash
git clone https://github.com/vincentmpalma/jobs-.git
cd jobs-
```

**2. Set up both `.env` files** as described above.

**3. Start the backend**

```bash
cd backend
npm install
node index.js
```

**4. Start the frontend** (new terminal)

```bash
cd frontend
npm install
npm run dev
```

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:8080 |

## Roadmap

Check the [GitHub Issues](../../issues) tab for bugs and planned features.

## Author

Vincent Palma
