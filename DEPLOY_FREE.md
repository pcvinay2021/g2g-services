# G2G Services — ₹0 Deployment Plan

## Stack
- Frontend: Render Static Site (free)
- Backend: Render Web Service (free)
- Database: MongoDB Atlas Free Cluster
- Resume storage: Cloudinary Free plan
- Domain: add `g2gservices.in` later when purchased

## Important
Render free web services can sleep after 15 minutes of inactivity and their local filesystem is ephemeral. Resume uploads therefore use Cloudinary instead of `server/src/uploads`.

## Required production environment variables
### Backend
MONGO_URI
JWT_SECRET
CLIENT_URL
ADMIN_EMAIL
ADMIN_PASSWORD
ADMIN_NAME
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

### Frontend build-time
VITE_API_URL=https://YOUR-BACKEND.onrender.com

## Deployment
1. Create a GitHub repository and push this project.
2. In Render choose New > Blueprint and select the repository.
3. Render reads `render.yaml` and creates the free API + static site.
4. During the first Blueprint setup, enter the secret values requested by Render.
5. After the API service receives its `onrender.com` URL, set:
   - Backend `CLIENT_URL` = frontend `https://YOUR-FRONTEND.onrender.com`
   - Frontend `VITE_API_URL` = backend `https://YOUR-BACKEND.onrender.com`
6. Redeploy the frontend after setting VITE_API_URL.

## MongoDB Atlas
Create a Free cluster and database user, then put its connection string in `MONGO_URI`. Atlas Free clusters are free and suitable for small applications, but have resource limits.

## Cloudinary
Create a Free account and use the Cloud Name, API Key and API Secret as Render environment variables.

## Domain later
When `g2gservices.in` is purchased, attach it to the Render static site and keep the backend on its Render URL.
