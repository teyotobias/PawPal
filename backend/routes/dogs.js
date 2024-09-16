const express = require("express");
const Dog = require("../models/dogModel");
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
router.post("/", async (req, res) => {
  const { name, breed, owner, size, description } = req.body;
  try {
    const dog = await Dog.create({ name, breed, owner, size, description });
    res.status(200).json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
