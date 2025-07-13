# 🔗 MERN Stack URL Shortener

A full-stack URL shortening application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This project allows users to create, manage, and track short URLs — similar to Bitly.

🎯 **Designed for the Innovaxel ASE Assessment**  
🌐 **Live Site**: [https://innovaxel-links.vercel.app](https://innovaxel-links.vercel.app)  
📌 *Note: Backend is hosted on a free-tier Render server. It may take up to 50 seconds to respond initially due to cold start.*

> 🛠️ All source code is in the `main` branch.

---

## 📦 Features

- 🔗 Create shortened URLs with randomly generated short codes
- 📥 Redirect short URLs to original long links
- 📊 Dashboard with statistics: total URLs, total hits, most popular links
- 📅 Tracks total clicks + clicks in the last 7 days
- ✅ Edit and delete short URLs
- 🔍 Search and filter links by keywords

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express.js + MongoDB
- **UI Components**: ShadCN UI, Sonner (for toasts)

---

## 2. Backend Setup

- cd backend
- npm install

## Create a .env file inside the backend folder:

- PORT=5000
- MONGO_URI=your_mongodb_connection_string


## Start the server:

- npm run dev
- Server will run at: http://localhost:5000

## 3. Frontend Setup
 
- cd frontend
- npm install
- npm run dev
