import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

// Save report
router.post("/report", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.json({ status: "success", saved: report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

// Get all reports
router.get("/reports", async (req, res) => {
  const reports = await Report.find().sort({ timestamp: -1 });
  res.json(reports);
});

// Get latest report per machine
router.get("/reports/latest", async (req, res) => {
  const latest = await Report.aggregate([
    { $sort: { timestamp: -1 } },
    { $group: { _id: "$machineId", latest: { $first: "$$ROOT" } } },
  ]);
  res.json(latest);
});

export default router;
