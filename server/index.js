import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import reportRoutes from "./report/route.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/", reportRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
