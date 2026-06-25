# Antor Adhikari Portfolio Frontend

A responsive React and Vite portfolio with Firebase Authentication, an API-backed public site, and a protected admin dashboard.

## Start locally

1. Copy `.env.example` to `.env`.
2. Add the API URL and Firebase web configuration.
3. Run `npm install`.
4. Run `npm run dev`.

Public pages remain usable when Firebase is not configured. API-backed sections show a helpful connection state until the backend is available.

## Backend contract

The API base URL comes from `VITE_API_BASE_URL`. Public endpoints are `GET /projects`, `GET /projects/:id`, `GET /skills`, `GET /blogs`, `GET /blogs/:id`, and `POST /messages`.

Protected requests include a Firebase ID token as `Authorization: Bearer <token>`. The backend must verify that token, return `{ "role": "admin" }` from `GET /auth/me`, and protect project, skill, blog, and message administration endpoints.
