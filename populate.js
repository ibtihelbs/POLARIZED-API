require("dotenv").config();
const mockData = require("./mock-data.json");
const Job = require("./models/Products");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.SECRET_MONGO)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const start = async () => {
  try {
    await mongoose.connect(process.env.SECRET_MONGO);
    await Job.create(mockData);
    console.log("Success !!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
