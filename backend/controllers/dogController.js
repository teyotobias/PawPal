const Dog = require("../models/dogModel");
const mongoose = require("mongoose");

// get all dogs
const getDogs = async (req, res) => {
  const dogs = await Dog.find({}).sort({ createdAt: -1 });

  res.status(200).json(dogs);
};

// get a single dog
const getDog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such dog" });
  }

  const dog = await Dog.findById(id);

  if (!dog) {
    return res.status(404).json({ error: "No such dog" });
  }
  res.status(200).json(dog);
};

// create a dog
const createDog = async (req, res) => {
  const { name, breed, owner, size, description } = req.body;
  try {
    const dog = await Dog.create({ name, breed, owner, size, description });
    res.status(200).json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a dog
const deleteDog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such dog" });
  }
  const dog = await Dog.findByIdAndDelete({ _id: id });

  if (!dog) {
    return res.status(400).json({ error: "No such dog" });
  }
  res.status(200).json(dog);
};

// update a dog
const updateDog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such dog" });
  }
  const dog = await Dog.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!dog) {
    return res.status(400).json({ error: "No such dog" });
  }
  res.status(200).json(dog);
};
module.exports = {
  getDogs,
  createDog,
  getDog,
  deleteDog,
  updateDog,
};
