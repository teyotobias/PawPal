const express = require("express");

const router = express.Router();

// Get ALL dogs
router.get("/", (req, res) => {
  res.json({ mssg: "Get all Dogs" });
});

// Get a single dog
router.get("/:id", (req, res) => {
  res.json({ mssg: "Get single Dog" });
});

// Post a dog
router.post("/", (req, res) => {
  res.json({ mssg: "Post a new dog" });
});

// Delete a dog
router.delete("/:id", (req, res) => {
  res.json({ mssg: "Delete a dog" });
});

// Update a dog
router.patch("/:id", (req, res) => {
  res.json({ mssg: "Update a dog" });
});

module.exports = router;
