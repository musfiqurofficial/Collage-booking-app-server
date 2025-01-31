const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createAdmission, getUserAdmissions } = require("../controllers/admissionController");

const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/", auth, upload.single("image"), createAdmission);
router.get("/user/:userId", auth, getUserAdmissions);

module.exports = router;
