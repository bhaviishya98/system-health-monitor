// models/Report.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  machineId: String,
  os: String,
  timestamp: Date,
  checks: {
    diskEncryption: String,
    antivirus: String,
    osUpdates: String,
    sleepSettings: String,
    cpuUsage: String,
    memoryUsage: String,
    diskUsage: String,
    uptime: String,
  },
});

export default mongoose.model("Report", reportSchema);
