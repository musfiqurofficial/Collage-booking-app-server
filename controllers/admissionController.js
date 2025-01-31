const Admission = require("../models/Admission");

const createAdmission = async (req, res) => {
  try {
    const { collegeName, candidateName, subject, email, phone, address, dob } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const newAdmission = new Admission({
      collegeName,
      candidateName,
      subject,
      email,
      phone,
      address,
      dob,
      imagePath: req.file.path,
      userId: req.userId, // Attach user ID to the admission
    });

    await newAdmission.save();

    res.status(201).json({ message: "Admission created successfully", data: newAdmission });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserAdmissions = async (req, res) => {
  try {
    const userId = req.params.userId;
    const admissions = await Admission.find({ userId });
    res.status(200).json(admissions);
  } catch (error) {
    console.error("Error fetching admissions:", error);
    res.status(500).json({ message: "Error fetching admissions" });
  }
};

module.exports = { createAdmission, getUserAdmissions };
