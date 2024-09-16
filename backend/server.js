require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const dogRoutes = require("./routes/dogs");

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/dogs", dogRoutes);

// connect to DB
mongoose.connect(process.env.MONGO_URI).then(() => {
  // listen for requests
  app.listen(process.env.PORT, () => {
    console.log(`Connected to db & listening on port ${4000}`);
  });
});
