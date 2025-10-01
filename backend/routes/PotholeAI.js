import express from "express";
import path from "path";

const router = express.Router();

// Example route to serve TFJS model or handle predictions
router.get("/model", (req, res) => {
  // You can send your model files to frontend
  res.sendFile(path.join(process.cwd(), "ai/model.json"));
});

export default router;
