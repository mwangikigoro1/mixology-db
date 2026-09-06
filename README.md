# 🍹 Mixology DB

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/mwangikigoro1/mixology-db)

A full-stack cocktail recipe app with a focus on Kenyan & international drinks.  
Built with **React + Vite** (frontend) and **Node/Express + MongoDB** (backend).

---

## Features

| Feature | Details |
|---|---|
| 🔍 Browse & search | Filter by category, ingredient, rating, occasion, local/international |
| 🍹 Cocktail of the Day | Auto-rotates daily; click "Surprise Me" for a random pick |
| 🧪 Cocktail Builder | Pick your ingredients → get matching cocktails with match scores |
| ⭐ Reviews & ratings | Logged-in users can leave star ratings + comments |
| 🔄 Substitutions | Every recipe shows ingredient swap suggestions |
| ❤️ Favourites | Save cocktails to your personal list |
| 🛒 Shopping list | Add all ingredients from any recipe in one click |
| 🌙 Dark mode | Persisted across sessions |
| 🇰🇪 Swahili support | Names and instructions in both English and Swahili |

---

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, React Router v6, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Hosting**: Render (backend Web Service + frontend Static Site)

---

## Running Locally

### Prerequisites
- Node.js 18+
- MongoDB running locally **or** a [MongoDB Atlas](https://www.mongodb.com/atlas) free cluster

### 1. Clone the repo

```bash
git clone https://github.com/your-username/mixology-db.git
cd mixology-db
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
# Edit .env and set MONGODB_URI and JWT_SECRET
npm install
npm run seed      # Loads all cocktails into the database
npm run dev       # Starts server on http://localhost:5000
```

### 3. Frontend setup

```bash
cd frontend
cp .env.example .env
# .env already points to http://localhost:5000/api — no changes needed for local dev
npm install
npm run dev       # Starts Vite on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Hosting on Render (Free Tier)

### Step 1 — Push to GitHub

Make sure your project is pushed to a GitHub repository (public or private).

### Step 2 — Create a MongoDB Atlas database

1. Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas) → create a free M0 cluster
2. Under **Database Access**, create a user with a password
3. Under **Network Access**, add `0.0.0.0/0` to allow connections from Render
4. Copy the **connection string** — it looks like:  
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/mixology-db`

### Step 3 — Deploy the backend

1. Go to [https://render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub repo
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `MONGODB_URI` | your Atlas connection string |
   | `JWT_SECRET` | any long random string |
   | `FRONTEND_URL` | `https://mixology-db-frontend.onrender.com` |
5. Click **Create Web Service** — note the URL (e.g. `https://mixology-db-api.onrender.com`)

### Step 4 — Seed the database on Render

After the backend is live, open the Render Shell for your backend service and run:
```bash
node seed/seed.js
```

### Step 5 — Deploy the frontend

1. Go to Render → **New** → **Static Site**
2. Connect the same GitHub repo
3. Settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Environment Variables**, add:
   | Key | Value |
   |---|---|
   | `VITE_API_URL` | `https://mixology-db-api.onrender.com/api` |
5. Add a **Redirect/Rewrite rule**:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: **Rewrite**
6. Click **Create Static Site**

### Step 6 — Update CORS

In your backend `.env` on Render, set:
```
FRONTEND_URL=https://mixology-db-frontend.onrender.com
```
Then trigger a redeploy.

> **Note**: Render free-tier web services spin down after 15 minutes of inactivity. The first request after a spin-down can take ~30 seconds. Upgrade to a paid plan to keep it always on.

---

## Alternative: Deploy with Railway

Railway is another free option that doesn't spin down services.

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

Set the same environment variables (`MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`) in the Railway dashboard.

---

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/cocktails` | — | List all cocktails (supports `?search`, `?category`, `?ingredient`, `?minRating`, `?isLocal`, `?occasion`) |
| GET | `/api/cocktails/cocktail-of-the-day` | — | Today's featured cocktail |
| GET | `/api/cocktails/random` | — | Random cocktail |
| GET | `/api/cocktails/builder?ingredients=Vodka,Lime` | — | Cocktails matching supplied ingredients |
| GET | `/api/cocktails/suggestions?limit=4` | — | Random sample |
| GET | `/api/cocktails/:id` | — | Single cocktail |
| POST | `/api/cocktails/:id/reviews` | ✅ | Add a review `{ rating, comment }` |
| DELETE | `/api/cocktails/:id/reviews/:reviewId` | ✅ | Delete own review |
| PUT | `/api/cocktails/:id/rating` | ✅ | Quick star rating |
| POST | `/api/users/register` | — | Register `{ username, email, password }` |
| POST | `/api/users/login` | — | Login `{ username, password }` |
| GET | `/api/users/profile` | ✅ | Get own profile |
| POST | `/api/users/favorites` | ✅ | Toggle favourite `{ cocktailId }` |
| PUT | `/api/users/shopping-list` | ✅ | Update shopping list |

---

## Project Structure

```
mixology-db/
├── backend/
│   ├── controllers/
│   │   ├── cocktailController.js
│   │   └── userController.js
│   ├── middleware/auth.js
│   ├── models/
│   │   ├── Cocktail.js
│   │   └── User.js
│   ├── routes/
│   │   ├── cocktails.js
│   │   └── users.js
│   ├── seed/
│   │   ├── cocktails.js   ← 30+ cocktail recipes
│   │   └── seed.js
│   ├── .env
│   ├── .env.example
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CocktailBuilder.jsx   ← NEW: ingredient → cocktail finder
│   │   │   ├── CocktailCard.jsx
│   │   │   ├── CocktailDetail.jsx    ← updated: reviews + substitutions
│   │   │   ├── CocktailOfTheDay.jsx  ← NEW: daily feature banner
│   │   │   ├── Favorites.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx            ← updated: builder link
│   │   │   ├── Register.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── ShoppingList.jsx
│   │   │   └── Slideshow.jsx
│   │   ├── context/AuthContext.jsx
│   │   ├── services/api.js
│   │   └── App.jsx
│   ├── .env
│   ├── .env.example
│   └── .env.production
└── render.yaml
```
