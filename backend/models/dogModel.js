const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// properties taken from dogs.txt file

const dogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
      trim: true,
    },
    breed: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
      trim: true,
    },
    owner: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      enum: ["SM", "MD", "LG", "XL", "XS"],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 500,
      required: true,
      minLength: 2,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dog", dogSchema);
