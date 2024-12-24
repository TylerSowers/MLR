const express = require("express");
const DateModel = require("../models/Date");
const RLDateModel = require("../models/RLDate");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

// Fetch dates for Manchester
router.get("/dates", async (req, res) => {
  try {
    const dates = await DateModel.find({});
    res.json(dates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add or remove dates for Manchester (protected)
router.post("/dates", authenticateToken, async (req, res) => {
  const { date } = req.body;
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access forbidden: Admins only" });
  }

  try {
    const existingDate = await DateModel.findOne({ date });
    if (existingDate) {
      await DateModel.deleteOne({ date });
      res.json({ message: "Date removed for Manchester" });
    } else {
      await DateModel.create({ date });
      res.json({ message: "Date added for Manchester" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch dates for Red Lion
router.get("/rldates", async (req, res) => {
  try {
    const dates = await RLDateModel.find({});
    res.json(dates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add or remove dates for Red Lion (protected)
router.post("/rldates", authenticateToken, async (req, res) => {
  const { date } = req.body;
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access forbidden: Admins only" });
  }

  try {
    const existingDate = await RLDateModel.findOne({ date });
    if (existingDate) {
      await RLDateModel.deleteOne({ date });
      res.json({ message: "Date removed for Red Lion" });
    } else {
      await RLDateModel.create({ date });
      res.json({ message: "Date added for Red Lion" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete dates for Manchester (protected)
router.delete("/dates", authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access forbidden: Admins only" });
  }

  const { date } = req.body;
  try {
    const existingDate = await DateModel.findOne({ date });
    if (!existingDate) {
      return res.status(404).json({ message: "Date not found" });
    }
    await DateModel.deleteOne({ date });
    res.json({ message: "Date removed for Manchester" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
