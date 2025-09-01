import os from "os";
import fs from "fs";
import { execSync } from "child_process";
import axios from "axios";
import cron from "node-cron";

const state_file = "./state.json";
const backend_url = "http://localhost:4000/report";

function getMachineId() {
  const idFile = "./machineId.txt";

  if (fs.existsSync(idFile)) {
    return fs.readFileSync(idFile, "utf8");
  } else {
    const id = `${os.hostname()} - ${Date.now()}`;
    fs.writeFileSync(idFile, id);
    return id;
  }
}

function checkDiskEncryption() {
  try {
    if (os.platform() === "win32") {
      const output = execSync("manage-bde -status C:", { encoding: "utf8" });

      if (
        /Percentage Encrypted:\s*100/.test(output) &&
        /Protection Status:\s*Protection On/.test(output)
      ) {
        return "encrypted (protection on)";
      } else if (/Percentage Encrypted:\s*100/.test(output)) {
        return "encrypted (protection off)";
      } else if (/Used Space Only Encrypted/.test(output)) {
        return "partially encrypted";
      } else {
        return "not encrypted";
      }
    } else if (os.platform() === "darwin") {
      const output = execSync("fdesetup status", { encoding: "utf8" });
      return output.includes("On") ? "encrypted" : "not encrypted";
    } else if (os.platform() === "linux") {
      const output = execSync("lsblk -o NAME,FSTYPE", { encoding: "utf8" });
      return output.includes("crypto_LUKS") ? "encrypted" : "not encrypted";
    }
    return "unknown";
  } catch (err) {
    return "unknown";
  }
}

function checkAntiVirus() {
  try {
    if (os.platform() === "win32") {
      const output = execSync(
        'powershell "Get-MpComputerStatus | Select-Object -Property AMServiceEnabled, AntivirusEnabled"',
        { encoding: "utf8" }
      );

      return output.includes("True") ? "running" : "disabled";
    } else if (os.platform() === "darwin") {
      const output = execSync("pgrep -l -f avast || true", {
        encoding: "utf8",
      });
      return output.trim() ? "running" : "disabled";
    } else if (os.platform() === "linux") {
      try {
        const output = execSync("systemctl is-active clamav-daemon || true", {
          encoding: "utf8",
        });
        return output.includes("active") ? "running" : "not found";
      } catch {
        return "not found";
      }
    }
    return "unknown";
  } catch (error) {
    return "unknown";
  }
}

function checkCPUUsage() {
    const cpus = os.cpus()

    let totalIdle = 0, totalTick = 0;

    cpus.forEach(cpu => {
        for (let type in cpu.times) {
            totalTick += cpu.times[type];
        }

        totalIdle += cpu.times.idle;
    })

    const idle = totalIdle / cpus.length
    const total = totalTick / cpus.length
    const usage = 100 - Math.floor((idle / total) * 100);

    return `${usage}%`;
}

function checkMemoryUsage() {
    const total = os.totalmem();
    const free = os.freemem();
    const used = total - free;
    const usage = Math.floor((used / total) * 100);

    return `${usage}%`;
}

function checkDiskUsage() {
  try {
    if (os.platform() === "win32") {
      const output = execSync(
        'powershell "Get-PSDrive -Name C | Select-Object Used,Free"',
        { encoding: "utf8" }
      );

      // Parse values
      const match = output.match(/(\d+)\s+(\d+)/);
      if (match) {
        const used = parseInt(match[1], 10);
        const free = parseInt(match[2], 10);
        const total = used + free;
        const percent = ((used / total) * 100).toFixed(1);
        return `C: ${percent}% used`;
      }
      return "unknown";
    } else {
      const output = execSync("df -h --total | grep total", {
        encoding: "utf8",
      });
      return output.trim();
    }
  } catch (err) {
    return "unknown";
  }
}

function checkUptime() {
  const uptimeSeconds = os.uptime();
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

function checkOSUpdates() {
  try {
    if (os.platform() === "win32") {
       const output = execSync(
         `powershell -Command "Get-WUList | Select-Object -First 1 Title"`,
         { encoding: "utf8" }
       );

       if (output && output.includes("Title")) {
         return "pending updates found";
       } else if (output && output.trim().length > 0) {
         return "updates available";
       } else {
         return "up to date";
       }
    } else if (os.platform() === "darwin") {
      const output = execSync("softwareupdate -l || true", {
        encoding: "utf8",
      });
      return output.includes("No new software available.")
        ? "up-to-date"
        : "updates available";
    } else if (os.platform() === "linux") {
      const output = execSync("apt-get -s upgrade | grep ^Inst || true", {
        encoding: "utf8",
      });
      return output.trim() ? "updates available" : "up-to-date";
    }
    return "unknown";
  } catch (err) {
    return "unknown";
  }
}


function checkSleepSettings() {
  try {
    if (os.platform() === "win32") {
      const output = execSync("powercfg -query", { encoding: "utf8" });
      return output.includes("600") ? "≤10 min" : ">10 min";
    } else if (os.platform() === "darwin") {
      const output = execSync("pmset -g | grep sleep", { encoding: "utf8" });
      return output.includes("10") ? "≤10 min" : ">10 min";
    } else if (os.platform() === "linux") {
      const output = execSync(
        "gsettings get org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout || true",
        { encoding: "utf8" }
      );
      const timeout = parseInt(output.trim(), 10);
      return timeout <= 600 ? "≤10 min" : ">10 min";
    }
    return "unknown";
  } catch (err) {
    return "unknown";
  }
}


function collectData() {
  return {
    machineId: getMachineId(),
    os: `${os.platform()} ${os.release()}`,
    timestamp: new Date().toISOString(),
    checks: {
      diskEncryption: checkDiskEncryption(),
      antivirus: checkAntiVirus(),
      osUpdates: checkOSUpdates(),
      sleepSettings: checkSleepSettings(),
      cpuUsage: checkCPUUsage(),
      memoryUsage: checkMemoryUsage(),
      diskUsage: checkDiskUsage(),
      uptime: checkUptime(),
    },
  };
}

function hasChanged(newState) {
  if (!fs.existsSync(state_file)) return true;
  const oldState = JSON.parse(fs.readFileSync(state_file, "utf8"));
  return JSON.stringify(oldState.checks) !== JSON.stringify(newState.checks);
}

function saveState(state) {
  fs.writeFileSync(state_file, JSON.stringify(state, null, 2));
}

async function sendToServer(data) {
  try {
    await axios.post(backend_url, data);
    console.log("✅ Report sent:", data);
  } catch (err) {
    console.error("❌ Failed to send report:", err.message);
  }
}

function runCheck() {
  const data = collectData();
  if (hasChanged(data)) {
    sendToServer(data);
    saveState(data);
  } else {
    console.log("ℹ️ No changes detected.");
  }
}

cron.schedule("*/30 * * * *", runCheck);

runCheck();
