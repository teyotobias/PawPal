const express = require("express");
const {
  createDog,
  getDogs,
  getDog,
  deleteDog,
  updateDog,
} = require("../controllers/dogController");
const router = express.Router();

// Get ALL dogs
router.get("/", getDogs);

// Get a single dog
router.get("/:id", getDog);

// Post a dog
router.post("/", createDog);

// Delete a dog
router.delete("/:id", deleteDog);

// Update a dog
router.patch("/:id", updateDog);

module.exports = router;
