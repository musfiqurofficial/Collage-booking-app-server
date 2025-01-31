const express = require("express");
const router = express.Router();
const Admission = require("../models/Admission");

// Get all admissions
router.get("/", async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.status(200).json(admissions);
  } catch (error) {
    console.error("Error fetching admissions:", error);
    res.status(500).json({ message: "Error fetching admissions" });
  }
});

module.exports = router;
