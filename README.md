# Antor Adhikari Full-Stack Portfolio

A responsive React and Vite portfolio with Firebase Authentication, MongoDB persistence, an Express API, and a protected admin dashboard.

## Start locally

1. Copy `.env.example` to `.env`.
2. Add your MongoDB URI, Firebase web configuration, Firebase Admin service-account values, and admin email.
3. Run `npm install`.
4. Run `npm run dev:full`.

The frontend runs at `http://localhost:5173` and the API runs at `http://localhost:5000`.

## Authentication and users

- Firebase handles email/password and Google sign-in in the browser.
- Protected frontend requests send `user.getIdToken()` as a Bearer token.
- Firebase Admin verifies the token on the Express server.
- MongoDB stores the Firebase UID, email, display name, photo, provider, role, and login timestamps.
- Emails listed in `ADMIN_EMAILS` are promoted to `admin` when their profile is synchronized.
- No custom frontend JWT is created or stored.

Create the first administrator in Firebase Authentication, then put the same email in `ADMIN_EMAILS`.

## MongoDB collections

- `users`
- `projects`
- `skills`
- `blogs`
- `messages`

Run `npm run seed:skills` after configuring MongoDB to add the portfolio's initial skill list.

## API

Public endpoints:

- `GET /api/health`
- `GET /api/projects`
- `GET /api/projects/:id`
- `GET /api/skills`
- `GET /api/skills/:id`
- `GET /api/blogs`
- `GET /api/blogs/:id`
- `POST /api/messages`

Firebase-authenticated endpoints:

- `GET /api/auth/me`

Administrator endpoints:

- Project, skill, and blog `POST`, `PATCH`, and `DELETE`
- `GET /api/messages`
- `GET /api/users`

## Deployment

Run `npm run build`, set `NODE_ENV=production`, and start with `npm start`. Express serves the built React application from `dist` in production. Configure the deployed frontend origin in `CLIENT_ORIGINS`.
