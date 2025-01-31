const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema(
  {
    collegeName: { type: String, required: true },
    candidateName: { type: String, required: true },
    subject: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true },
    imagePath: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admission", AdmissionSchema);
