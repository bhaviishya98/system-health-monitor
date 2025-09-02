# 🖥️ Cross-Platform Monitoring System

A full-stack application for monitoring system health across **Windows, macOS, and Linux**.  
The project consists of:

1. **Client Agent** – runs on machines, collects system health data (CPU, memory, disk usage, antivirus status, etc.), and reports to the backend.
2. **Server (API)** – receives reports, stores them in MongoDB, and serves data to the dashboard.
3. **Dashboard (Web UI)** – displays machine reports and health status in real-time.

---

## 🚀 Features
- Cross-platform client (Windows `.exe`, Mac `client-mac`, Linux `client-lin`).
- Collects:
  - CPU Usage
  - Memory Usage
  - Disk Usage
  - Disk Encryption Status
  - Antivirus Status
  - OS Updates
  - Sleep Settings
  - Uptime
- Backend built with **Node.js + Express + MongoDB**.
- Dashboard built with **Next.js + TailwindCSS**.
- Automatic periodic reporting with **cron jobs**.
- Lightweight and easy to deploy.

---

## 🛠️ Tech Stack
- **Client:** Node.js, pkg (for binary builds), axios, node-cron
- **Server:** Node.js, Express, MongoDB
- **Dashboard:** Next.js, React, TailwindCSS

---

## 📂 Project Structure
```
cross-platform-monitoring/
│
├── client/                # Client agent
│   ├── src/index.js       # Main monitoring script
│   ├── dist/              # Compiled binaries (win/mac/linux)
│   ├── package.json
│
├── server/                # Backend API
│   ├── models/            # MongoDB schemas
│   ├── report/route.js    # Report routes
│   ├── db.js              # Database connection
│   ├── index.js           # Express entry point
│   ├── .env               # Environment variables
│
├── dashboard/             # Web Dashboard
│   ├── app/               # Next.js pages
│   ├── components/        # UI components
│   ├── utils/             # Helper functions
│   ├── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Server (Backend)
```bash
cd server
npm install
```

- Create a `.env` file:
```env
MONGO_URI=your-mongodb-connection-string

```

- Run server:
```bash
npm start
```

Your backend will be running at `http://localhost:4000`.

---

### 2. Dashboard (Web UI)
```bash
cd dashboard
npm install
npm run dev
```

- Open `http://localhost:3000` in your browser.

---

### 3. Client (Agent)
```bash
cd client
npm install
```

Run locally:
```bash
npm start
```

Or build executables:
```bash
pkg . --targets node18-win-x64,node18-linux-x64,node18-macos-x64
```

This will generate binaries in `client/dist/`:
- `client-win.exe` (Windows)
- `client-lin` (Linux)
- `client-mac` (Mac)

---

## 📦 Distributing the Client

### On Windows:
```powershell
.\client-win.exe
```

### On Linux/macOS:
```bash
chmod +x client-lin    # or client-mac
./client-lin           # or ./client-mac
```

⚠️ On macOS, the first run may show a warning  
👉 Go to **System Settings → Security & Privacy → Allow Anyway**

---

## 🌍 Deployment Notes
- **Server** can be deployed to [Render](https://render.com), Heroku, or any Node.js host.  
- **Dashboard** can be deployed to [Vercel](https://vercel.com).  
- **Client binaries** can be shared via Google Drive / GitHub releases.  


