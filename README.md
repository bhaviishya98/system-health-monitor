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


## 🚀 Quick Start

### 1️⃣ Running the Dashboard (Frontend)
```bash
cd dashboard
npm install
npm run dev
```
- Runs the Next.js app at `http://localhost:3000`

### 2️⃣ Running the Server (Backend)
```bash
cd server
npm install
npm start
```
- Starts the Express server on `http://localhost:5000`

Make sure MongoDB is running.

---

## 💻 Running the Client (Monitoring Agent)

### Option 1: Build from Source
```bash
cd client
npm install
npm start
```

### Option 2: Run Prebuilt Executable (Recommended)
We provide prebuilt binaries in `dist.zip`.  
You can **download, unzip, and run directly** without needing Node.js from https://drive.google.com/drive/folders/1PeHxKWmDN3Clcc2Gbz8OTWtU8Sp_7I9C?usp=drive_link.

1. Download `dist.zip` (contains `client-win.exe`, `client-mac`, `client-lin`).
2. Extract the folder.
3. Run the executable **as Administrator** (important for system checks).

#### 🪟 On Windows
```powershell
cd dist
./client-win.exe
```

#### 🍏 On macOS
```bash
cd dist
chmod +x client-mac
./client-mac
```
⚠️ If you see *“unverified developer”*, go to  
**System Settings → Security & Privacy → Allow Anyway**.

#### 🐧 On Linux
```bash
cd dist
chmod +x client-lin
./client-lin
```

---

## 🛠 Tech Stack
- **Client**: Node.js, `os`, `child_process`, `axios`, `node-cron`
- **Server**: Express.js, MongoDB, Mongoose
- **Dashboard**: Next.js, React, TailwindCSS

---

## 📊 Example Data Sent to Server
```json
{
  "machineId": "DESKTOP-12345",
  "os": "win32 10.0.26100",
  "timestamp": "2025-09-02T09:30:00.067Z",
  "checks": {
    "diskEncryption": "encrypted",
    "antivirus": "running",
    "osUpdates": "updates available",
    "sleepSettings": ">10 min",
    "cpuUsage": "15%",
    "memoryUsage": "72%",
    "diskUsage": "C: 40% used",
    "uptime": "3h 22m"
  }
}
```

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


