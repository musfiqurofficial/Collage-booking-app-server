const express = require("express");
const router = express.Router();

let reviews = [];

// GET all reviews
router.get("/reviews", (req, res) => {
  res.status(200).json(reviews);
});

// POST a new review
router.post("/reviews", (req, res) => {
  const { review, rating, collegeName, name } = req.body;

  if (!review || !rating || !collegeName || !name) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newReview = {
    id: reviews.length + 1,
    review,
    rating,
    collegeName,
    name,
    date: new Date().toISOString(),
  };

  reviews.push(newReview);
  res.status(201).json({ message: "Review added successfully.", newReview });
});

module.exports = router;
