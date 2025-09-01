"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("http://localhost:4000/reports/latest");
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading reports...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Machine Health Dashboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Machine ID</th>
            <th className="border p-2">OS</th>
            <th className="border p-2">CPU Usage</th>
            <th className="border p-2">Memory Usage</th>
            <th className="border p-2">Disk Usage</th>
            <th className="border p-2">Uptime</th>
            <th className="border p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r._id} className="text-center">
              <td className="border p-2">{r.latest.machineId}</td>
              <td className="border p-2">{r.latest.os}</td>
              <td className="border p-2">{r.latest.checks.cpuUsage}</td>
              <td className="border p-2">{r.latest.checks.memoryUsage}</td>
              <td className="border p-2">{r.latest.checks.diskUsage}</td>
              <td className="border p-2">{r.latest.checks.uptime}</td>
              <td className="border p-2">
                {new Date(r.latest.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
