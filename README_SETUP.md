# G2G Services - Local Setup

## 1. Backend

Open a terminal in `server`:

```bash
npm install
npm run dev
```

Create `server/.env` from `server/.env.example` and set your MongoDB URI and JWT secret.

## 2. Frontend

Open another terminal in `client`:

```bash
npm install
npm run dev
```

Create `client/.env` from `client/.env.example` if the API is not running on `http://localhost:5000`.

## 3. Admin account

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` in `server/.env`, then run:

```bash
node src/createAdmin.js
```

The script will not print or store a plaintext password in source code.

## 4. Main API endpoints

- `GET /api/health`
- `POST /api/contact`
- `POST /api/careers` (multipart form with `resume`)
- `POST /api/admin/login`
- `GET /api/admin/dashboard` (admin token)
- `GET /api/admin/contacts` (admin token)
- `PATCH /api/admin/contacts/:id/status` (admin token)
- `DELETE /api/admin/contacts/:id` (admin token)
- `GET /api/admin/careers` (admin token)
- `PUT /api/admin/careers/:id/status` (admin token)
- `DELETE /api/admin/careers/:id` (admin token)

Uploaded resumes are served from `/uploads/resumes/...`.
